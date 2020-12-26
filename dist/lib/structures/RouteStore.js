"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteStore = void 0;
const pieces_1 = require("@sapphire/pieces");
const discord_js_1 = require("discord.js");
const url_1 = require("url");
const HttpMethods_1 = require("./http/HttpMethods");
const Route_1 = require("./Route");
const slash = '/'.charCodeAt(0);
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
        const { method } = request;
        if (typeof method === 'undefined')
            return null;
        const methodTable = this.table.get(method);
        if (typeof methodTable === 'undefined')
            return null;
        const { splits, querystring } = this.parseURL(request.url);
        for (const [route, cb] of methodTable.entries()) {
            const result = route.router.match(splits);
            if (result === null)
                continue;
            request.params = result;
            request.query = Object.fromEntries(new url_1.URLSearchParams(querystring).entries());
            return { route, cb };
        }
        return null;
    }
    parseURL(url = '') {
        const index = url.indexOf('?');
        /* eslint-disable @typescript-eslint/init-declarations */
        let pathname;
        let querystring;
        /* eslint-enable @typescript-eslint/init-declarations */
        if (index === -1) {
            pathname = url;
            querystring = '';
        }
        else {
            pathname = url.substring(0, index);
            querystring = url.substring(index + 1);
        }
        if (pathname.charCodeAt(0) === slash)
            pathname = pathname.substring(1);
        if (pathname.length > 0 && pathname.charCodeAt(pathname.length - 1) === slash)
            pathname = pathname.substring(0, pathname.length - 1);
        const splits = pathname.split('/');
        return { splits, querystring };
    }
}
exports.RouteStore = RouteStore;
//# sourceMappingURL=RouteStore.js.map