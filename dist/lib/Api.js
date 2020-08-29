"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.kRoutePathCacheSymbol = void 0;
const framework_1 = require("@sapphire/framework");
const utilities_1 = require("@sapphire/utilities");
const Server_1 = require("./structures/http/Server");
exports.kRoutePathCacheSymbol = Symbol('pathCache');
/**
 * @since 1.0.0
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class Api {
    /**
     * @since 1.0.0
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static postInitializationHook(_options) {
        utilities_1.mergeDefault({}, this.options);
        this.server = new Server_1.Server(this);
    }
    /**
     * @since 1.0.0
     */
    static [framework_1.postInitialization](scopedThis, options) {
        return this.postInitializationHook.call(scopedThis, options);
    }
}
exports.Api = Api;
//# sourceMappingURL=Api.js.map