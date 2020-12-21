"use strict";
// Copyright (c) 2018 Stanislav Woodger. All rights reserved. MIT license.
// Source: https://github.com/woodger/cookie-httponly
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieStore = void 0;
class CookieStore extends Map {
    constructor(request, response, secure) {
        var _a, _b;
        super();
        Object.defineProperty(this, "request", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "domain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "secure", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.request = request;
        this.response = response;
        // Read cookies
        const { cookie = '' } = request.headers;
        const pairs = cookie.split(';');
        for (const pair of pairs) {
            const index = pair.indexOf('=');
            if (index === -1)
                continue;
            const key = decodeURIComponent(pair.substr(0, index).trim());
            const value = decodeURIComponent(pair.substr(index + 1).trim());
            this.set(key, value);
        }
        const [domain] = (_b = (_a = this.request.headers.host) === null || _a === void 0 ? void 0 : _a.split(':')) !== null && _b !== void 0 ? _b : [''];
        // RFC 6265 5.1.3 Domain Matching
        this.domain = domain.toLowerCase();
        if (this.request.socket.remoteAddress === this.domain) {
            throw new Error('The connection must be established from the domain name (i.e., not an IP address)');
        }
        // RFC 6265 4.1.2.5. The Secure Attribute
        this.secure = secure;
    }
    add(name, value, options) {
        this.insert(name, this.prepare(name, value, options));
    }
    insert(name, entry) {
        let set = this.response.getHeader('Set-Cookie');
        if (set === undefined) {
            set = [];
        }
        else if (!Array.isArray(set)) {
            set = [set.toString()];
        }
        set = set.filter((i) => i.substr(0, i.indexOf('=')) !== name);
        set.push(entry);
        this.response.setHeader('Set-Cookie', set);
    }
    prepare(name, value, { expires, maxAge, domain, path, httpOnly } = {}) {
        const now = new Date();
        if (expires === undefined) {
            expires = now;
        }
        // RFC 6265 4.1.1. Syntax
        name = CookieStore.encodeCookieOctet(name);
        value = CookieStore.encodeCookieOctet(value);
        let entry = `${name}=${value}`;
        if (expires !== now) {
            entry += `; Expires=${expires.toUTCString()}`;
        }
        else if (maxAge) {
            entry += `; Max-Age=${maxAge}`;
        }
        // RFC 6265 5.1.3 Domain Matching
        domain = (domain !== null && domain !== void 0 ? domain : this.domain).toLowerCase();
        if (domain !== this.domain) {
            entry += `; Domain=${domain}`;
        }
        entry += `; Path=${path !== null && path !== void 0 ? path : '/'}`;
        if (this.secure) {
            entry += `; Secure`;
        }
        if (httpOnly !== null && httpOnly !== void 0 ? httpOnly : true) {
            entry += `; HttpOnly`;
        }
        return entry;
    }
    static encodeCookieOctet(value) {
        if (CookieStore.octetRegExp.test(value)) {
            throw new Error(`Invalid character in value`);
        }
        return encodeURIComponent(value);
    }
}
exports.CookieStore = CookieStore;
// RFC 6265 4.1.1. Syntax
Object.defineProperty(CookieStore, "octetRegExp", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /[^\x21\x23-\x2B\x2D-\x3A\x3C-\x5B\x5D-\x7E]/g
});
//# sourceMappingURL=CookieStore.js.map