"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginMiddleware = void 0;
const CookieStore_1 = require("../lib/structures/api/CookieStore");
const Middleware_1 = require("../lib/structures/Middleware");
class PluginMiddleware extends Middleware_1.Middleware {
    constructor(context) {
        super(context, { position: 30 });
        Object.defineProperty(this, "production", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: process.env.NODE_ENV === 'production'
        });
    }
    run(request, response) {
        response.cookies = new CookieStore_1.CookieStore(request, response, this.production);
    }
}
exports.PluginMiddleware = PluginMiddleware;
//# sourceMappingURL=cookies.js.map