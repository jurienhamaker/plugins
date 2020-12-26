"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginEvent = void 0;
const framework_1 = require("@sapphire/framework");
require("../lib/structures/http/Server");
class PluginEvent extends framework_1.Event {
    constructor(context) {
        super(context, { emitter: 'server', event: "noMatch" /* NoMatch */ });
    }
    run(_, response) {
        if (!response.writableEnded)
            response.notFound();
    }
}
exports.PluginEvent = PluginEvent;
//# sourceMappingURL=coreServerNoMatch.js.map