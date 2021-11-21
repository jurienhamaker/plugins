import { container } from '@sapphire/framework';
import Bull, { Job, JobOptions, Queue, QueueOptions } from 'bull';
import type { ScheduledTaskCreateRepeatedTask, ScheduledTasksTaskOptions } from '../types';
import type { ScheduledTaskBaseStrategy } from '../types/ScheduledTaskBaseStrategy';

export interface ScheduledTaskRedisStrategyOptions {
	queue?: string;
	bull?: QueueOptions;
}

export interface ScheduledTaskRedisStrategyJob {
	task: string;
	payload?: unknown;
}

export class ScheduledTaskRedisStrategy implements ScheduledTaskBaseStrategy {
	public readonly options: QueueOptions;
	public readonly queue: string;

	private client!: Queue;

	public constructor(options?: ScheduledTaskRedisStrategyOptions) {
		this.queue = options?.queue ?? 'scheduled-tasks';
		this.options = options?.bull ?? {};
	}

	public async connect() {
		this.client = new Bull(this.queue, this.options);
		await this.client.process((job: Job<ScheduledTaskRedisStrategyJob>) => this.run(job?.data?.task, job?.data?.payload));
	}

	public create(task: string, payload?: unknown, options?: ScheduledTasksTaskOptions) {
		if (!this.client) {
			return;
		}

		let bullOptions: JobOptions = { delay: options?.delay };

		if (options?.type === 'repeated') {
			bullOptions = {
				repeat: options?.interval
					? {
							every: options.interval!
					  }
					: {
							cron: options.cron!
					  }
			};
		}

		return this.client.add(
			{
				task,
				payload
			},
			bullOptions
		);
	}

	public async createRepeated(tasks: ScheduledTaskCreateRepeatedTask[]) {
		for (const task of tasks) {
			await this.create(task.name, null, task.options);
		}
	}

	public run(task: string, payload: unknown) {
		return container.tasks.run(task, payload);
	}
}