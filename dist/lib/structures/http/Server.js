"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.ServerEvents = void 0;
const events_1 = require("events");
const http_1 = require("http");
const ApiRequest_1 = require("../api/ApiRequest");
const ApiResponse_1 = require("../api/ApiResponse");
const MiddlewareStore_1 = require("../MiddlewareStore");
const RouteStore_1 = require("../RouteStore");
const Auth_1 = require("./Auth");
var ServerEvents;
(function (ServerEvents) {
    ServerEvents["Error"] = "error";
    ServerEvents["Request"] = "request";
    ServerEvents["Match"] = "match";
    ServerEvents["NoMatch"] = "noMatch";
    ServerEvents["MiddlewareFailure"] = "middlewareFailure";
    ServerEvents["MiddlewareError"] = "middlewareError";
    ServerEvents["MiddlewareSuccess"] = "middlewareSuccess";
})(ServerEvents = exports.ServerEvents || (exports.ServerEvents = {}));
/**
 * @since 1.0.0
 */
class Server extends events_1.EventEmitter {
    /**
     * @since 1.0.0
     * @param client The @sapphire/framework Client instance
     */
    constructor(client) {
        var _a, _b, _c;
        super();
        Object.defineProperty(this, "routes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "middlewares", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "auth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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
         * @since 1.0.0
         */
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = client;
        this.server = http_1.createServer({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            IncomingMessage: ApiRequest_1.ApiRequest,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ServerResponse: ApiResponse_1.ApiResponse,
            ...((_b = (_a = this.client.options.api) === null || _a === void 0 ? void 0 : _a.server) !== null && _b !== void 0 ? _b : {})
        });
        this.routes = new RouteStore_1.RouteStore(client);
        this.middlewares = new MiddlewareStore_1.MiddlewareStore(client);
        this.auth = Auth_1.Auth.create(client, (_c = this.client.options.api) === null || _c === void 0 ? void 0 : _c.auth);
        this.server.on('error', this.emit.bind(this, "error" /* Error */));
        this.server.on('request', this.emit.bind(this, "request" /* Request */));
    }
    connect() {
        var _a, _b;
        const { server } = this;
        server.listen({
            port: 4000,
            ...((_b = (_a = this.client.options.api) === null || _a === void 0 ? void 0 : _a.listenOptions) !== null && _b !== void 0 ? _b : {})
        });
        return new Promise((resolve, reject) => {
            function listening() {
                cleanup();
                resolve();
            }
            function error(error) {
                cleanup();
                reject(error);
            }
            function close() {
                cleanup();
                reject(new Error('Closed unexpectedly.'));
            }
            function cleanup() {
                server.off('listening', listening);
                server.off('error', error);
                server.off('close', close);
            }
            server.on('listening', listening);
            server.on('error', error);
            server.on('close', close);
        });
    }
    disconnect() {
        return new Promise((resolve, reject) => {
            this.server.close((error) => (error ? resolve() : reject(error)));
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map