"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginEvent = void 0;
const framework_1 = require("@sapphire/framework");
require("../lib/structures/http/Server");
class PluginEvent extends framework_1.Event {
    constructor(context) {
        super(context, { emitter: 'server', event: "request" /* Request */ });
    }
    run(request, response) {
        const match = this.client.server.routes.match(request);
        if (match === null) {
            this.client.server.emit("noMatch" /* NoMatch */, request, response);
        }
        else {
            this.client.server.emit("match" /* Match */, request, response, match);
        }
    }
}
exports.PluginEvent = PluginEvent;
//# sourceMappingURL=coreServerRequest.js.map