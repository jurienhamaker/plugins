import type { ScheduledTaskHandler } from './lib/ScheduledTaskHandler';
import type { ScheduledTasksOptions } from './lib/types';

export * from './lib/ScheduledTaskHandler';
export * from './lib/strategies';
export * from './lib/structures/ScheduledTask';
export * from './lib/structures/ScheduledTaskStore';
export * from './lib/types';

declare module '@sapphire/pieces' {
	interface Container {
		tasks: ScheduledTaskHandler;
	}
}

declare module 'discord.js' {
	export interface ClientOptions {
		tasks?: ScheduledTasksOptions;
	}
}
