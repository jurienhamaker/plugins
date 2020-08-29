"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpPatch = exports.HttpTrace = exports.HttpOptions = exports.HttpConnect = exports.HttpDelete = exports.HttpPut = exports.HttpPost = exports.HttpHead = exports.HttpGet = exports.createHttpMethodDecorator = void 0;
const Api_1 = require("../Api");
require("../structures/http/HttpMethods");
/**
 * @since 1.0.0
 * @private
 * @param httpMethod The standard Http method for the specified route.
 * @param route The route on which this method should answer.
 */
function createHttpMethodDecorator(httpMethod, _route) {
    return (target, method) => {
        const ctor = target.constructor;
        const previous = Reflect.get(ctor, Api_1.kRoutePathCacheSymbol);
        const route = _route !== null && _route !== void 0 ? _route : method.toString();
        if (previous) {
            previous.push({ method, route, httpMethod });
        }
        else {
            Reflect.defineProperty(ctor, Api_1.kRoutePathCacheSymbol, {
                value: [{ method, route, httpMethod }],
                configurable: false,
                enumerable: false,
                writable: false
            });
        }
    };
}
exports.createHttpMethodDecorator = createHttpMethodDecorator;
// From this point onward we don't want naming convention to be enforced
/* eslint-disable @typescript-eslint/naming-convention */
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
exports.HttpGet = (route) => createHttpMethodDecorator("GET" /* GET */, route);
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
exports.HttpHead = (route) => createHttpMethodDecorator("HEAD" /* HEAD */, route);
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
exports.HttpPost = (route) => createHttpMethodDecorator("POST" /* POST */, route);
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
exports.HttpPut = (route) => createHttpMethodDecorator("PUT" /* PUT */, route);
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
exports.HttpDelete = (route) => createHttpMethodDecorator("DELETE" /* DELETE */, route);
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
exports.HttpConnect = (route) => createHttpMethodDecorator("CONNECT" /* CONNECT */, route);
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
exports.HttpOptions = (route) => createHttpMethodDecorator("OPTIONS" /* OPTIONS */, route);
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
exports.HttpTrace = (route) => createHttpMethodDecorator("TRACE" /* TRACE */, route);
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
exports.HttpPatch = (route) => createHttpMethodDecorator("PATCH" /* PATCH */, route);
//# sourceMappingURL=HttpMethods.js.map