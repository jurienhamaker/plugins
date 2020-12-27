"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginEvent = void 0;
const framework_1 = require("@sapphire/framework");
require("../lib/structures/http/HttpCodes");
require("../lib/structures/http/Server");
class PluginEvent extends framework_1.Event {
    constructor(context) {
        super(context, { emitter: 'server', event: "routeError" /* RouteError */ });
    }
    run(error, { response }) {
        var _a;
        // Log the error to console:
        this.context.client.logger.fatal(error);
        // Send a response to the client if none was sent:
        if (!response.writableEnded)
            response.status(500 /* InternalServerError */).json({ error: (_a = error.message) !== null && _a !== void 0 ? _a : error });
    }
}
exports.PluginEvent = PluginEvent;
//# sourceMappingURL=coreRouteError.js.map