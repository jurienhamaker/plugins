import type { Awaitable } from '@sapphire/utilities';
import type { ScheduledTasks } from '../structures/ScheduledTask';
import type { ScheduledTaskCreateRepeatedTask } from './ScheduledTaskCreateRepeatedTask';
import type { ScheduledTasksTaskOptions } from './ScheduledTasksTaskOptions';

export interface ScheduledTaskBaseStrategy {
	connect(): void;
	create(task: keyof ScheduledTasks, payload: unknown, options?: ScheduledTasksTaskOptions): void;
	createRepeated(tasks: ScheduledTaskCreateRepeatedTask[]): void;
	run(task: keyof ScheduledTasks, payload: unknown): Awaitable<unknown>;
}
