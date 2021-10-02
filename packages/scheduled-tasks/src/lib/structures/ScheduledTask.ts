import { Piece, PieceContext, PieceOptions } from '@sapphire/pieces';
import type { Awaited } from '@sapphire/utilities';

export abstract class ScheduledTask extends Piece {
	public readonly interval: number | null;
	public readonly cron: string | null;

	public constructor(context: PieceContext, options: ScheduledTask.Options) {
		super(context, options);
		this.interval = options.interval ?? null;
		this.cron = options.cron ?? null;
	}

	public abstract run(payload: ScheduledTask.Payload): Awaited<unknown>;
}

export interface ScheduledTasks {}

export type ScheduledTasksKeys = keyof ScheduledTasks;
export type SimplePreconditionKeys = {
	[K in ScheduledTasksKeys]: ScheduledTasks[K] extends never ? K : never;
}[ScheduledTasksKeys];

export type ScheduledTaskOptions =
	| (PieceOptions & { cron: string } & { interval?: never })
	| (PieceOptions & { cron?: never } & { interval: number });

export interface ScheduledTaskPayload extends Record<PropertyKey, unknown> {
	external?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ScheduledTask {
	export type Options = ScheduledTaskOptions;
	export type Payload = ScheduledTaskPayload;
}
