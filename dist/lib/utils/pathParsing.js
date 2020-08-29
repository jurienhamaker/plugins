"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.split = exports.parsePart = exports.TypeState = void 0;
const [slash, colon] = [47, 58];
/**
 * @since 1.0.0
 */
var TypeState;
(function (TypeState) {
    /**
     * @since 1.0.0
     */
    TypeState[TypeState["Static"] = 0] = "Static";
    /**
     * @since 1.0.0
     */
    TypeState[TypeState["Dynamic"] = 1] = "Dynamic";
})(TypeState = exports.TypeState || (exports.TypeState = {}));
/**
 * @since 1.0.0
 */
function parsePart(value) {
    const type = value.charCodeAt(0) === colon ? 0 /* Static */ : 1 /* Dynamic */;
    if (type)
        value = value.substring(1);
    return [value, type];
}
exports.parsePart = parsePart;
/**
 * @since 1.0.0
 */
function split(url) {
    if (url.length === 1 && url.charCodeAt(0) === slash)
        return [url];
    else if (url.charCodeAt(0) === slash)
        url = url.substring(1);
    return url.split('/');
}
exports.split = split;
/**
 * @since 1.0.0
 */
function parse(url) {
    return split(url).map(parsePart);
}
exports.parse = parse;
//# sourceMappingURL=pathParsing.js.map