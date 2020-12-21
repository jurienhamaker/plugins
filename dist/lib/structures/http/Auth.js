"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _secret;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const crypto_1 = require("crypto");
class Auth {
    constructor(id, cookie, secret) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cookie", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
        _secret.set(this, void 0);
        this.id = id;
        this.cookie = cookie;
        __classPrivateFieldSet(this, _secret, secret);
    }
    get secret() {
        return __classPrivateFieldGet(this, _secret);
    }
    /**
     * Encrypts an object with aes-256-cbc to use as a token.
     * @since 1.0.0
     * @param data An object to encrypt
     * @param secret The secret to encrypt the data with
     */
    encrypt(data) {
        const iv = crypto_1.randomBytes(16);
        const cipher = crypto_1.createCipheriv('aes-256-cbc', __classPrivateFieldGet(this, _secret), iv);
        return `${cipher.update(JSON.stringify(data), 'utf8', 'base64') + cipher.final('base64')}.${iv.toString('base64')}`;
    }
    /**
     * Decrypts an object with aes-256-cbc to use as a token.
     * @since 1.0.0
     * @param token An data to decrypt
     * @param secret The secret to decrypt the data with
     */
    decrypt(token) {
        const [data, iv] = token.split('.');
        const decipher = crypto_1.createDecipheriv('aes-256-cbc', __classPrivateFieldGet(this, _secret), Buffer.from(iv, 'base64'));
        return JSON.parse(decipher.update(data, 'base64', 'utf8') + decipher.final('utf8'));
    }
    static create(client, options) {
        var _a, _b, _c;
        if (!(options === null || options === void 0 ? void 0 : options.secret))
            return null;
        const id = (_b = (_a = options.id) !== null && _a !== void 0 ? _a : client.id) !== null && _b !== void 0 ? _b : client.options.id;
        if (!id)
            return null;
        return new Auth(id, (_c = options.cookie) !== null && _c !== void 0 ? _c : 'SAPPHIRE_AUTH', options.secret);
    }
}
exports.Auth = Auth;
_secret = new WeakMap();
//# sourceMappingURL=Auth.js.map