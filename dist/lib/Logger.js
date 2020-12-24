"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const framework_1 = require("@sapphire/framework");
const colorette_1 = require("colorette");
const console_1 = require("console");
const util_1 = require("util");
const LoggerLevel_1 = require("./LoggerLevel");
/**
 * The logger class.
 * @since 1.0.0
 */
class Logger extends framework_1.Logger {
    constructor(options = {}) {
        var _a, _b, _c, _d, _e;
        super((_a = options.level) !== null && _a !== void 0 ? _a : 30 /* Info */);
        /**
         * The console this writes to.
         * @since 1.0.0
         */
        Object.defineProperty(this, "console", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The formats supported by the logger.
         * @since 1.0.0
         */
        Object.defineProperty(this, "formats", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The string `write` will join values by.
         * @since 1.0.0
         */
        Object.defineProperty(this, "join", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The inspect depth when logging objects.
         * @since 1.0.0
         */
        Object.defineProperty(this, "depth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.console = new console_1.Console((_b = options.stdout) !== null && _b !== void 0 ? _b : process.stdout, (_c = options.stderr) !== null && _c !== void 0 ? _c : process.stderr);
        this.formats = Logger.createFormatMap(options.format, options.defaultFormat);
        this.join = (_d = options.join) !== null && _d !== void 0 ? _d : ' ';
        this.depth = (_e = options.depth) !== null && _e !== void 0 ? _e : 0;
        if (typeof options.stylize === 'boolean')
            Logger.stylize = options.stylize;
    }
    /**
     * Writes the log message given a level and the value(s).
     * @param level The log level.
     * @param values The values to log.
     */
    write(level, ...values) {
        var _a, _b;
        if (level < this.level)
            return;
        const method = (_a = this.levels.get(level)) !== null && _a !== void 0 ? _a : 'log';
        const formatter = (_b = this.formats.get(level)) !== null && _b !== void 0 ? _b : this.formats.get(100 /* None */);
        this.console[method](formatter.run(this.preprocess(values)));
    }
    /**
     * Pre-processes an array of values.
     * @since 1.0.0
     * @param values The values to pre-process.
     */
    preprocess(values) {
        const inspectOptions = { colors: colorette_1.options.enabled, depth: this.depth };
        return values.map((value) => (typeof value === 'string' ? value : util_1.inspect(value, inspectOptions))).join(this.join);
    }
    get levels() {
        return Reflect.get(framework_1.Logger, 'levels');
    }
    /**
     * Gets whether or not colorette is enabled.
     * @since 1.0.0
     */
    static get stylize() {
        return colorette_1.options.enabled;
    }
    /**
     * Sets whether or not colorette should be enabled.
     * @since 1.0.0
     */
    static set stylize(value) {
        colorette_1.options.enabled = value;
    }
    static createFormatMap(options, defaults) {
        var _a;
        if (options === void 0) { options = {}; }
        if (defaults === void 0) { defaults = (_a = options.none) !== null && _a !== void 0 ? _a : {}; }
        return new Map([
            [10 /* Trace */, Logger.ensureDefaultLevel(options.trace, defaults, colorette_1.gray, 'TRACE')],
            [20 /* Debug */, Logger.ensureDefaultLevel(options.debug, defaults, colorette_1.magenta, 'DEBUG')],
            [30 /* Info */, Logger.ensureDefaultLevel(options.info, defaults, colorette_1.cyan, 'INFO')],
            [40 /* Warn */, Logger.ensureDefaultLevel(options.warn, defaults, colorette_1.yellow, 'WARN')],
            [50 /* Error */, Logger.ensureDefaultLevel(options.error, defaults, colorette_1.red, 'ERROR')],
            [60 /* Fatal */, Logger.ensureDefaultLevel(options.fatal, defaults, colorette_1.bgRed, 'FATAL')],
            [100 /* None */, Logger.ensureDefaultLevel(options.none, defaults, colorette_1.white, '')]
        ]);
    }
    static ensureDefaultLevel(options, defaults, color, name) {
        var _a;
        if (options)
            return new LoggerLevel_1.LoggerLevel(options);
        return new LoggerLevel_1.LoggerLevel({
            ...defaults,
            timestamp: defaults.timestamp === null ? null : { ...((_a = defaults.timestamp) !== null && _a !== void 0 ? _a : {}), color },
            infix: name.length ? `${color(name.padEnd(5, ' '))} - ` : ''
        });
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map