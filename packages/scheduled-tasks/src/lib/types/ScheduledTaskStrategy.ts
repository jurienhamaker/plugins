import type { ScheduledTaskRedisStrategy, ScheduledTaskSQSStrategy } from '../strategies';

export type ScheduledTaskStrategy = ScheduledTaskRedisStrategy | ScheduledTaskSQSStrategy;
