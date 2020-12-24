/// <reference types="node" />
import { Logger as BuiltinLogger, LogLevel } from '@sapphire/framework';
import { LoggerLevel, LoggerLevelOptions } from './LoggerLevel';
/**
 * The logger class.
 * @since 1.0.0
 */
export declare class Logger extends BuiltinLogger {
    /**
     * The console this writes to.
     * @since 1.0.0
     */
    readonly console: Console;
    /**
     * The formats supported by the logger.
     * @since 1.0.0
     */
    readonly formats: Map<LogLevel, LoggerLevel>;
    /**
     * The string `write` will join values by.
     * @since 1.0.0
     */
    readonly join: string;
    /**
     * The inspect depth when logging objects.
     * @since 1.0.0
     */
    readonly depth: number;
    constructor(options?: LoggerOptions);
    /**
     * Writes the log message given a level and the value(s).
     * @param level The log level.
     * @param values The values to log.
     */
    write(level: LogLevel, ...values: readonly unknown[]): void;
    /**
     * Pre-processes an array of values.
     * @since 1.0.0
     * @param values The values to pre-process.
     */
    protected preprocess(...values: readonly unknown[]): string;
    private get levels();
    /**
     * Gets whether or not colorette is enabled.
     * @since 1.0.0
     */
    static get stylize(): boolean;
    /**
     * Sets whether or not colorette should be enabled.
     * @since 1.0.0
     */
    static set stylize(value: boolean);
    private static createFormatMap;
    private static ensureDefaultLevel;
}
/**
 * The logger options.
 * @since 1.0.0
 */
export interface LoggerOptions {
    /**
     * The WriteStream for the output logs.
     * @since 1.0.0
     * @default process.stdout
     */
    stdout?: NodeJS.WriteStream;
    /**
     * A WriteStream for the error logs.
     * @since 1.0.0
     * @default process.stderr
     */
    stderr?: NodeJS.WriteStream;
    /**
     * The default options used to fill all the possible values for [[LoggerOptions.format]].
     * @since 1.0.0
     * @default options.format.none ?? {}
     */
    defaultFormat?: LoggerLevelOptions;
    /**
     * The options for each log level. LogLevel.None serves to set the default for all keys, where only
     * [[LoggerTimestampOptions.timestamp]] and [[LoggerLevelOptions.prefix]] would be overridden.
     * @since 1.0.0
     * @default {}
     */
    format?: LoggerFormatOptions;
    /**
     * The minimum log level.
     * @since 1.0.0
     * @default LogLevel.Info
     */
    level?: LogLevel;
    /**
     * The string that joins different messages.
     * @since 1.0.0
     * @default ' '
     */
    join?: string;
    /**
     * Whether or not styles should be applied, this modifies colorette's global options. For specific ones, use `null`
     * in the style options. Alternatively, you can set a boolean to [[Logger.stylize]] to change this setting anytime.
     * @since 1.0.0
     */
    stylize?: boolean;
    /**
     * The inspect depth when logging objects.
     * @since 1.0.0
     * @default 0
     */
    depth?: number;
}
/**
 * The logger format options.
 * @since 1.0.0
 */
export interface LoggerFormatOptions {
    /**
     * The logger options for the lowest log level, used when calling [[ILogger.trace]].
     * @since 1.0.0
     */
    trace?: LoggerLevelOptions;
    /**
     * The logger options for the debug level, used when calling [[ILogger.debug]].
     * @since 1.0.0
     */
    debug?: LoggerLevelOptions;
    /**
     * The logger options for the info level, used when calling [[ILogger.info]].
     * @since 1.0.0
     */
    info?: LoggerLevelOptions;
    /**
     * The logger options for the warning level, used when calling [[ILogger.warn]].
     * @since 1.0.0
     */
    warn?: LoggerLevelOptions;
    /**
     * The logger options for the error level, used when calling [[ILogger.error]].
     * @since 1.0.0
     */
    error?: LoggerLevelOptions;
    /**
     * The logger options for the critical level, used when calling [[ILogger.fatal]].
     * @since 1.0.0
     */
    fatal?: LoggerLevelOptions;
    /**
     * The logger options for an unknown or uncategorized level.
     * @since 1.0.0
     */
    none?: LoggerLevelOptions;
}
//# sourceMappingURL=Logger.d.ts.map