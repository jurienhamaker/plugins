"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginEvent = void 0;
const framework_1 = require("@sapphire/framework");
require("../lib/structures/http/Server");
class PluginEvent extends framework_1.Event {
    constructor(context) {
        super(context, { emitter: 'server', event: "match" /* Match */ });
    }
    async run(request, response, match) {
        try {
            await this.context.server.middlewares.run(request, response, match.route);
            this.context.server.emit(response.writableEnded ? "middlewareFailure" /* MiddlewareFailure */ : "middlewareSuccess" /* MiddlewareSuccess */, request, response, match);
        }
        catch (error) {
            this.context.server.emit("middlewareError" /* MiddlewareError */, request, response, error, match);
        }
    }
}
exports.PluginEvent = PluginEvent;
//# sourceMappingURL=coreServerMatch.js.map