import { container } from '@sapphire/framework';
import type { Awaited } from '@sapphire/utilities';
import { ScheduledTaskRedisStrategy } from './strategies/ScheduledTaskRedisStrategy';
import { ScheduledTaskStore } from './structures/ScheduledTaskStore';
import type { ScheduledTasksOptions, ScheduledTasksTaskOptions, ScheduledTaskStrategy } from './types';

export class ScheduledTaskHandler {
	public readonly strategy: ScheduledTaskStrategy;

	public constructor(options: ScheduledTasksOptions | undefined) {
		this.strategy = options?.strategy ?? new ScheduledTaskRedisStrategy();
		this.strategy.connect();
	}

	public create(task: string, payload: unknown, options?: ScheduledTasksTaskOptions | number) {
		if (typeof options === 'number') {
			options = {
				type: 'default',
				delay: options
			};
		}

		return this.strategy.create(task, payload, options);
	}

	public createRepeated() {
		const store = this._getStore();

		return this.strategy.createRepeated(
			store.repeatedTasks.map((piece) => ({
				name: piece.name,
				options: {
					type: 'repeated',
					...(piece.interval
						? {
								interval: piece.interval!
						  }
						: { cron: piece.cron! })
				}
			}))
		);
	}

	public run(task: string, payload: unknown): Awaited<unknown> {
		const store = this._getStore();
		const piece = store.get(task);

		if (!piece) {
			return;
		}

		return piece.run(payload);
	}

	private _getStore(): ScheduledTaskStore {
		const scheduledTasksStore: ScheduledTaskStore = container.client.stores.get(ScheduledTaskStore.storeName)!;
		if (!scheduledTasksStore) {
			throw new Error(`${ScheduledTaskStore.storeName} store is not present.`);
		}

		return scheduledTasksStore;
	}
}
