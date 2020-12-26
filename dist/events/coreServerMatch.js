"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginEvent = void 0;
const framework_1 = require("@sapphire/framework");
require("../lib/structures/http/Server");
class PluginEvent extends framework_1.Event {
    constructor(context) {
        super(context, { emitter: 'server', event: "match" /* Match */ });
    }
    run(request, response, match) {
        this.context.server.emit(response.writableEnded ? "middlewareFailure" /* MiddlewareFailure */ : "middlewareSuccess" /* MiddlewareSuccess */, request, response, match);
    }
}
exports.PluginEvent = PluginEvent;
//# sourceMappingURL=coreServerMatch.js.map