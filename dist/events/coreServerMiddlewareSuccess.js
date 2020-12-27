"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginEvent = void 0;
const framework_1 = require("@sapphire/framework");
require("../lib/structures/http/Server");
class PluginEvent extends framework_1.Event {
    constructor(context) {
        super(context, { emitter: 'server', event: "middlewareSuccess" /* MiddlewareSuccess */ });
    }
    async run(request, response, match) {
        try {
            await match.cb(request, response);
        }
        catch (error) {
            this.context.server.emit("routeError" /* RouteError */, error, { request, response, match });
        }
    }
}
exports.PluginEvent = PluginEvent;
//# sourceMappingURL=coreServerMiddlewareSuccess.js.map