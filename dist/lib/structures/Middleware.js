"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const framework_1 = require("@sapphire/framework");
/**
 * @since 1.0.0
 */
class Middleware extends framework_1.BasePiece {
    constructor(context, options = {}) {
        var _a;
        super(context, options);
        /**
         * The position the middleware has. The {@link MiddlewareStore} will run all middlewares with lower position than
         * this one.
         *
         * The built-in middlewares follow the following positions:
         * - headers: 10
         * - body: 20
         * - cookies: 30
         * - auth: 40
         */
        Object.defineProperty(this, "position", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.position = (_a = options.position) !== null && _a !== void 0 ? _a : 1000;
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=Middleware.js.map