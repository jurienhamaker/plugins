"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http_1 = require("http");
/**
 * @since 1.0.0
 */
class Server {
    /**
     * @since 1.0.0
     * @param client The @sapphire/framework Client instance
     */
    constructor(client) {
        /**
         * The http.Server instance that manages the recieved HTTP requests.
         * @since 1.0.0
         */
        Object.defineProperty(this, "server", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The managing Client instance on which this Server instance is mounted.
         * @private
         * @since 1.0.0
         */
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = client;
        this.server = http_1.createServer(this.client.options.api.server);
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map