"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginMiddleware = void 0;
const Middleware_1 = require("../lib/structures/Middleware");
class PluginMiddleware extends Middleware_1.Middleware {
    constructor(context) {
        var _a, _b;
        super(context, { position: 40 });
        Object.defineProperty(this, "cookieName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { server } = this.context;
        this.cookieName = (_b = (_a = server.auth) === null || _a === void 0 ? void 0 : _a.cookie) !== null && _b !== void 0 ? _b : 'SAPPHIRE_AUTH';
        this.enabled = server.auth !== null;
    }
    run(request, response) {
        const authorization = response.cookies.get(this.cookieName);
        request.auth = authorization ? this.context.server.auth.decrypt(authorization) : null;
    }
}
exports.PluginMiddleware = PluginMiddleware;
//# sourceMappingURL=auth.js.map