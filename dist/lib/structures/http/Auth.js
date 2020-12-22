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
    constructor(options) {
        var _a, _b;
        /**
         * The client's application id, this can be retrieved in Discord Developer Portal at https://discord.com/developers/applications.
         * @since 1.0.0
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The name for the cookie, this will be used to identify a Secure HttpOnly cookie.
         * @since 1.0.0
         */
        Object.defineProperty(this, "cookie", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The scopes defined at https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes.
         * @since 1.0.0
         */
        Object.defineProperty(this, "scopes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The redirect uri.
         * @since 1.0.0
         */
        Object.defineProperty(this, "redirect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
        _secret.set(this, void 0);
        this.id = options.id;
        this.cookie = (_a = options.cookie) !== null && _a !== void 0 ? _a : 'SAPPHIRE_AUTH';
        this.scopes = (_b = options.scopes) !== null && _b !== void 0 ? _b : ['identify'];
        this.redirect = options.redirect;
        __classPrivateFieldSet(this, _secret, options.secret);
    }
    /**
     * The client secret, this can be retrieved in Discord Developer Portal at https://discord.com/developers/applications.
     * @since 1.0.0
     */
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
    static create(options) {
        if (!(options === null || options === void 0 ? void 0 : options.secret) || !options.id)
            return null;
        return new Auth(options);
    }
}
exports.Auth = Auth;
_secret = new WeakMap();
//# sourceMappingURL=Auth.js.map