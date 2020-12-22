"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteStore = void 0;
const pieces_1 = require("@sapphire/pieces");
const discord_js_1 = require("discord.js");
const url_1 = require("url");
const HttpMethods_1 = require("./http/HttpMethods");
const Route_1 = require("./Route");
/**
 * @since 1.0.0
 */
class RouteStore extends pieces_1.Store {
    constructor() {
        super(Route_1.Route, { name: 'routes' });
        Object.defineProperty(this, "table", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new discord_js_1.Collection()
        });
        for (const [method] of HttpMethods_1.methodEntries)
            this.table.set(method, new discord_js_1.Collection());
    }
    match(request) {
        var _a;
        const { method } = request;
        if (typeof method === 'undefined')
            return null;
        const methodTable = this.table.get(method);
        if (typeof methodTable === 'undefined')
            return null;
        const parsed = new url_1.URL((_a = request.url) !== null && _a !== void 0 ? _a : '');
        const splitUrl = parsed.pathname.split('/');
        for (const [route, cb] of methodTable.entries()) {
            const result = route.router.match(splitUrl);
            if (result === null)
                continue;
            request.params = result;
            request.query = Object.fromEntries(parsed.searchParams.entries());
            return { route, cb };
        }
        return null;
    }
}
exports.RouteStore = RouteStore;
//# sourceMappingURL=RouteStore.js.map