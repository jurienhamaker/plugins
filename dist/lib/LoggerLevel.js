"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerLevel = void 0;
const LoggerStyle_1 = require("./LoggerStyle");
const LoggerTimestamp_1 = require("./LoggerTimestamp");
/**
 * Logger utility that stores and applies a full style into the message.
 * @since 1.0.0
 */
class LoggerLevel {
    constructor(options = {}) {
        var _a;
        /**
         * The timestamp formatter.
         * @since 1.0.0
         */
        Object.defineProperty(this, "timestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The infix, added between the timestamp and the message.
         * @since 1.0.0
         */
        Object.defineProperty(this, "infix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The style formatter for the message.
         * @since 1.0.0
         */
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.timestamp = options.timestamp === null ? null : new LoggerTimestamp_1.LoggerTimestamp(options.timestamp);
        this.infix = (_a = options.infix) !== null && _a !== void 0 ? _a : '';
        this.message = options.message === null ? null : new LoggerStyle_1.LoggerStyle(options.message);
    }
    run(content) {
        var _a, _b;
        const prefix = ((_b = (_a = this.timestamp) === null || _a === void 0 ? void 0 : _a.run()) !== null && _b !== void 0 ? _b : '') + this.infix;
        if (prefix.length) {
            const formatter = this.message //
                ? (line) => prefix + this.message.run(line)
                : (line) => prefix + line;
            return content.split('\n').map(formatter).join('\n');
        }
        return this.message ? this.message.run(content) : content;
    }
}
exports.LoggerLevel = LoggerLevel;
//# sourceMappingURL=LoggerLevel.js.map