"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const framework_1 = require("@sapphire/framework");
const path_1 = require("path");
const Server_1 = require("./structures/http/Server");
/**
 * @since 1.0.0
 */
class Api extends framework_1.Plugin {
    /**
     * @since 1.0.0
     */
    static [framework_1.postInitialization]() {
        this.server = new Server_1.Server(this);
        this.registerStore(this.server.routes) //
            .registerStore(this.server.middlewares);
        this.events.registerPath(path_1.join(__dirname, '..', 'events'));
        this.server.routes.registerPath(path_1.join(__dirname, '..', 'routes'));
        this.server.middlewares.registerPath(path_1.join(__dirname, '..', 'middlewares'));
    }
    /**
     * @since 1.0.0
     */
    static async [framework_1.preLogin]() {
        await this.server.connect();
    }
}
exports.Api = Api;
//# sourceMappingURL=Api.js.map