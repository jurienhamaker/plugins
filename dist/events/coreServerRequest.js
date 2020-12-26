"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginEvent = void 0;
const framework_1 = require("@sapphire/framework");
require("../lib/structures/http/Server");
class PluginEvent extends framework_1.Event {
    constructor(context) {
        super(context, { emitter: 'server', event: "request" /* Request */ });
    }
    async run(request, response) {
        var _a;
        const match = this.context.server.routes.match(request);
        try {
            // Middlewares need to be run regardless of the match, specially since browsers do an OPTIONS request first.
            await this.context.server.middlewares.run(request, response, (_a = match === null || match === void 0 ? void 0 : match.route) !== null && _a !== void 0 ? _a : null);
        }
        catch (error) {
            this.context.server.emit("middlewareError" /* MiddlewareError */, request, response, error, match);
            // If a middleware errored, it might cause undefined behaviour in the routes, so we will return early.
            return;
        }
        if (match === null) {
            this.context.server.emit("noMatch" /* NoMatch */, request, response);
        }
        else {
            this.context.server.emit("match" /* Match */, request, response, match);
        }
    }
}
exports.PluginEvent = PluginEvent;
//# sourceMappingURL=coreServerRequest.js.map