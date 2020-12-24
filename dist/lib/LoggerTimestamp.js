"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerTimestamp = void 0;
const time_utilities_1 = require("@sapphire/time-utilities");
const LoggerStyle_1 = require("./LoggerStyle");
/**
 * Logger utility that formats a timestamp.
 * @since 1.0.0
 */
class LoggerTimestamp {
    constructor(options = {}) {
        var _a, _b, _c;
        /**
         * The timestamp used to format the current date.
         * @since 1.0.0
         */
        Object.defineProperty(this, "timestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether or not the logger will show a timestamp in UTC.
         * @since 1.0.0
         */
        Object.defineProperty(this, "utc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The logger style to apply the color to the timestamp.
         * @since 1.0.0
         */
        Object.defineProperty(this, "color", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The final formatter.
         * @since 1.0.0
         */
        Object.defineProperty(this, "formatter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.timestamp = new time_utilities_1.Timestamp((_a = options.pattern) !== null && _a !== void 0 ? _a : 'YYYY-MM-DD HH:mm:ss');
        this.utc = (_b = options.utc) !== null && _b !== void 0 ? _b : false;
        this.color = options.color === null ? null : new LoggerStyle_1.LoggerStyle(options.color);
        this.formatter = (_c = options.formatter) !== null && _c !== void 0 ? _c : ((timestamp) => `${timestamp} - `);
    }
    /**
     * Formats the current time.
     * @since 1.0.0
     */
    run() {
        const date = new Date();
        const result = this.utc ? this.timestamp.displayUTC(date) : this.timestamp.display(date);
        return this.formatter(this.color ? this.color.run(result) : result);
    }
}
exports.LoggerTimestamp = LoggerTimestamp;
//# sourceMappingURL=LoggerTimestamp.js.map