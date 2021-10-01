import { container } from '@sapphire/framework';
import type { Job, JobOptions, Queue, QueueOptions } from 'bull';
import Bull from 'bull';
import type { ScheduledTasks } from '../structures/ScheduledTask';
import type { ScheduledTaskCreateRepeatedTask, ScheduledTasksTaskOptions } from '../types';
import type { ScheduledTaskBaseStrategy } from '../types/ScheduledTaskBaseStrategy';

export interface ScheduledTaskRedisStrategyOptions {
	queue?: string;
	bull?: QueueOptions;
}

export interface ScheduledTaskRedisStrategyJob {
	task: string;
	payload?: any;
}

export class ScheduledTaskRedisStrategy implements ScheduledTaskBaseStrategy {
	public readonly options: QueueOptions;
	public readonly queue: string;

	private _client!: Queue;

	constructor(options?: ScheduledTaskRedisStrategyOptions) {
		this.queue = options?.queue ?? 'scheduled-tasks';
		this.options = options?.bull ?? {};
	}

	public async connect() {
		this._client = new Bull(this.queue, this.options);
		this._client.process((job: Job<ScheduledTaskRedisStrategyJob>) => this.run(job?.data?.task, job?.data?.payload));
	}

	public create(task: ScheduledTasks, payload?: any, options?: ScheduledTasksTaskOptions) {
		if (!this._client) {
			return;
		}

		let bullOptions: JobOptions = { delay: options?.delay };

		if (options?.type === 'repeated') {
			bullOptions = {
				repeat: options?.interval
					? {
							every: options?.interval!
					  }
					: {
							cron: options?.cron!
					  }
			};
		}

		this._client.add(
			{
				task,
				payload
			},
			bullOptions
		);
	}

	public createRepeated(tasks: ScheduledTaskCreateRepeatedTask[]) {
		for (let task of tasks) {
			this.create(task.name, null, task.options);
		}
	}

	public run(task: string, payload: any) {
		return container.tasks.run(task, payload);
	}
}
