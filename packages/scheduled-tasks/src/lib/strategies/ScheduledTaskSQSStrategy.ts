import { container } from '@sapphire/framework';
import type { SQS } from 'aws-sdk';
import { Consumer, ConsumerOptions } from 'sqs-consumer';
import { Producer } from 'sqs-producer';
import type { ScheduledTaskCreateRepeatedTask, ScheduledTasksTaskOptions } from '../types';
import type { ScheduledTaskBaseStrategy } from '../types/ScheduledTaskBaseStrategy';

export interface ScheduledTaskSQSStrategyMessageBody {
	task: string;
	payload?: any;
	options: ScheduledTasksTaskOptions;
}

export class ScheduledTaskSQSStrategy implements ScheduledTaskBaseStrategy {
	public readonly options: ConsumerOptions;

	private producer!: Producer;

	public constructor(options: ConsumerOptions) {
		this.options = options;
	}

	public async connect() {
		this.producer = Producer.create(this.options);

		const consumer = Consumer.create({
			...this.options,
			handleMessage: async (message) => void this._handleMessage(message),
			handleMessageBatch: async (messages) => void this._handleBatch(messages)
		});
		consumer.start();
	}

	public create(task: string, payload?: any, options?: ScheduledTasksTaskOptions) {
		if (!this.producer) {
			return;
		}

		if (options?.cron?.length) {
			throw new Error('SQS does not support cron notation.');
		}

		let delay = options?.delay ? options?.delay / 1000 : 0;
		if (options?.type === 'repeated') {
			delay = options.interval! / 1000;
		}

		return this.producer.send({
			id: `${task}-${Date.now()}`, // need it to be a unique ID'ish
			body: JSON.stringify({
				task,
				payload,
				options
			}),
			delaySeconds: delay
		});
	}

	public async createRepeated(tasks: ScheduledTaskCreateRepeatedTask[]) {
		for (const task of tasks) {
			await this.create(task.name, null, task.options);
		}
	}

	public run(task: string, payload: any) {
		return container.tasks.run(task, payload);
	}

	private async _handleMessage(message: SQS.Message) {
		const data = JSON.parse(message.Body!) as ScheduledTaskSQSStrategyMessageBody;
		const result = await this.run(data.task, data.payload);

		if (data.options.type === 'repeated') {
			await this.create(data.task, data.payload, data.options);
		}

		return result;
	}

	private async _handleBatch(messages: SQS.Message[]) {
		for (const message of messages) {
			await this._handleMessage(message);
		}
	}
}
