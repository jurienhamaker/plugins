"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const RouteData_1 = require("../utils/RouteData");
const HttpMethods_1 = require("./http/HttpMethods");
/**
 * @since 1.0.0
 */
class Route extends framework_1.BasePiece {
    constructor(context, options = {}) {
        var _a, _b, _c, _d, _e, _f;
        super(context, options);
        /**
         * (RFC 7230 3.3.2) The maximum decimal number of octets.
         */
        Object.defineProperty(this, "maximumBodyLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The route information.
         */
        Object.defineProperty(this, "router", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The methods this route accepts.
         */
        Object.defineProperty(this, "methods", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new discord_js_1.Collection()
        });
        this.router = new RouteData_1.RouteData(`${(_b = (_a = this.client.options.api) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : ''}${(_c = options.route) !== null && _c !== void 0 ? _c : ''}`);
        for (const [method, symbol] of HttpMethods_1.methodEntries) {
            const value = Reflect.get(this, symbol);
            if (typeof value === 'function')
                this.methods.set(method, value);
        }
        this.maximumBodyLength = (_f = (_d = options.maximumBodyLength) !== null && _d !== void 0 ? _d : (_e = this.client.options.api) === null || _e === void 0 ? void 0 : _e.maximumBodyLength) !== null && _f !== void 0 ? _f : 1024 * 1024 * 50;
    }
    /**
     * Per-piece listener that is called when the piece is loaded into the store.
     * Useful to set-up asynchronous initialization tasks.
     */
    onLoad() {
        const store = this.store;
        for (const [method, cb] of this.methods) {
            store.table.get(method).set(this, cb.bind(this));
        }
        return undefined;
    }
    /**
     * Per-piece listener that is called when the piece is unloaded from the store.
     * Useful to set-up clean-up tasks.
     */
    onUnload() {
        const store = this.store;
        for (const [method] of this.methods) {
            store.table.get(method).delete(this);
        }
        return undefined;
    }
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map