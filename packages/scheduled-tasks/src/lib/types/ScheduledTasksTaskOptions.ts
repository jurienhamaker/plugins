export interface ScheduledTasksTaskOptions {
	type: 'default' | 'repeated';
	delay?: number;
	interval?: number;
	cron?: string;
}
