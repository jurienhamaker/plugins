"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginMiddleware = void 0;
const Middleware_1 = require("../lib/structures/Middleware");
class PluginMiddleware extends Middleware_1.Middleware {
    constructor(context) {
        var _a, _b, _c;
        super(context, { position: 40 });
        Object.defineProperty(this, "cookieName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cookieName = (_c = (_b = (_a = this.client.options.api) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.cookie) !== null && _c !== void 0 ? _c : 'SAPPHIRE_AUTH';
        this.enabled = this.client.server.auth !== null;
    }
    run(request, response) {
        const authorization = response.cookies.get(this.cookieName);
        request.auth = authorization ? this.client.server.auth.decrypt(authorization) : null;
    }
}
exports.PluginMiddleware = PluginMiddleware;
//# sourceMappingURL=auth.js.map