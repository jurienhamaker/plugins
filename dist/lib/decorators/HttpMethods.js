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
const HttpGet = (route) => createHttpMethodDecorator("GET" /* GET */, route);
exports.HttpGet = HttpGet;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
const HttpHead = (route) => createHttpMethodDecorator("HEAD" /* HEAD */, route);
exports.HttpHead = HttpHead;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
const HttpPost = (route) => createHttpMethodDecorator("POST" /* POST */, route);
exports.HttpPost = HttpPost;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
const HttpPut = (route) => createHttpMethodDecorator("PUT" /* PUT */, route);
exports.HttpPut = HttpPut;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
const HttpDelete = (route) => createHttpMethodDecorator("DELETE" /* DELETE */, route);
exports.HttpDelete = HttpDelete;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
const HttpConnect = (route) => createHttpMethodDecorator("CONNECT" /* CONNECT */, route);
exports.HttpConnect = HttpConnect;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
const HttpOptions = (route) => createHttpMethodDecorator("OPTIONS" /* OPTIONS */, route);
exports.HttpOptions = HttpOptions;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
const HttpTrace = (route) => createHttpMethodDecorator("TRACE" /* TRACE */, route);
exports.HttpTrace = HttpTrace;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
const HttpPatch = (route) => createHttpMethodDecorator("PATCH" /* PATCH */, route);
exports.HttpPatch = HttpPatch;
//# sourceMappingURL=HttpMethods.js.map