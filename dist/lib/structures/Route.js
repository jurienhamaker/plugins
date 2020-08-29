"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const Api_1 = require("../Api");
const http_1 = require("http");
const pathParsing_1 = require("../utils/pathParsing");
/**
 * @since 1.0.0
 */
class Route extends framework_1.BasePiece {
    constructor(context, { name, ...options } = {}) {
        super(context, { ...options, name: name === null || name === void 0 ? void 0 : name.toLowerCase() });
        /**
         * @since 1.0.0
         */
        Object.defineProperty(this, "route", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * @since 1.0.0
         */
        Object.defineProperty(this, "$internalRoutingTable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new discord_js_1.Collection()
        });
        /**
         * Internal route remains empty until either the store fills it from piece options or the decorator sets it.
         * Its main function is acting as the main route for the DEFAULT HttpMethod decorators.
         * OR as the base route for decorator defined sub routes.
         * @protected
         * @since 1.0.0
         */
        Object.defineProperty(this, "$internalRoute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        this.route = `${this.client.options.api.prefix}${this.$internalRoute}`;
        Reflect.defineProperty(Route, Api_1.kRoutePathCacheSymbol, { value: [] });
        for (const method of http_1.METHODS) {
            this.$internalRoutingTable.set(method, Reflect.get(Route, Api_1.kRoutePathCacheSymbol)
                .filter((rt) => rt.httpMethod === method)
                .map((rt) => [rt.method, pathParsing_1.parse(rt.route)]));
        }
    }
    matchRoute(method, split) {
        const routes = this.$internalRoutingTable.get(method);
        if (!routes.some((rt) => rt[1].length === split.length))
            return '';
        for (const rte of routes) {
            for (let ir = 0; ir < rte[1].length; ir++) {
                const routeEntry = rte[1][ir];
                if (routeEntry[1] !== 0 && routeEntry[0] === split[ir])
                    return rte[0];
            }
        }
        return '';
    }
}
exports.Route = Route;
_a = Api_1.kRoutePathCacheSymbol;
//# sourceMappingURL=Route.js.map