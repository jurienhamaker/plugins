"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginEvent = void 0;
const framework_1 = require("@sapphire/framework");
require("../lib/structures/http/HttpCodes");
require("../lib/structures/http/Server");
class PluginEvent extends framework_1.Event {
    constructor(context) {
        super(context, { emitter: 'server', event: "middlewareError" /* MiddlewareError */ });
    }
    run(_, response, error) {
        if (!response.writableEnded)
            response.status(500 /* InternalServerError */).json({ error: error.message });
    }
}
exports.PluginEvent = PluginEvent;
//# sourceMappingURL=coreServerMiddlewareError.js.map