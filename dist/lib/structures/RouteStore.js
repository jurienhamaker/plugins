"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteStore = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const http_1 = require("http");
const Route_1 = require("./Route");
/**
 * @since 1.0.0
 */
class RouteStore extends framework_1.BaseStore {
    constructor(client) {
        // @ts-expect-error Argument of type 'typeof Route' is not assignable to parameter of type 'Constructor<Route>'. Cannot assign an abstract constructor type to a non-abstract constructor type. (2345)
        super(client, Route_1.Route);
        Object.defineProperty(this, "routingTable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new discord_js_1.Collection()
        });
        // TODO: Add routes to routingTable
        for (const method of http_1.METHODS)
            this.routingTable.set(method, new discord_js_1.Collection());
    }
}
exports.RouteStore = RouteStore;
//# sourceMappingURL=RouteStore.js.map