"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginRoute = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const querystring_1 = require("querystring");
require("../../lib/structures/http/HttpCodes");
const HttpMethods_1 = require("../../lib/structures/http/HttpMethods");
const Route_1 = require("../../lib/structures/Route");
class PluginRoute extends Route_1.Route {
    constructor(context) {
        var _a, _b, _c;
        super(context);
        Object.defineProperty(this, "scopes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "scopeString", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "redirectUri", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { server } = this.context;
        this.enabled = server.auth !== null;
        this.scopes = (_b = (_a = server.auth) === null || _a === void 0 ? void 0 : _a.scopes) !== null && _b !== void 0 ? _b : ['identify'];
        this.scopeString = this.scopes.join(' ');
        this.redirectUri = (_c = server.auth) === null || _c === void 0 ? void 0 : _c.redirect;
    }
    async [HttpMethods_1.methods.POST](request, response) {
        const body = request.body;
        if (typeof (body === null || body === void 0 ? void 0 : body.code) !== 'string') {
            return response.badRequest();
        }
        const value = await this.fetchAuth(body.code);
        if (value === null) {
            return response.status(500 /* InternalServerError */).json({ error: 'Failed to fetch the token.' });
        }
        const data = await this.fetchData(value.access_token);
        if (!data.user) {
            return response.status(500 /* InternalServerError */).json({ error: 'Failed to fetch the user.' });
        }
        const auth = this.context.server.auth;
        const token = auth.encrypt({
            id: data.user.id,
            expires: value.expires_in,
            refresh: value.refresh_token,
            token: value.access_token
        });
        response.cookies.add(auth.cookie, token, { maxAge: value.expires_in });
        return response.json(data);
    }
    async fetchAuth(code) {
        const { id, secret } = this.context.server.auth;
        const data = {
            /* eslint-disable @typescript-eslint/naming-convention */
            client_id: id,
            client_secret: secret,
            code,
            grant_type: 'authorization_code',
            scope: this.scopeString,
            redirect_uri: this.redirectUri
            /* eslint-enable @typescript-eslint/naming-convention */
        };
        const result = await node_fetch_1.default('https://discord.com/api/v8/oauth2/token', {
            method: 'POST',
            body: querystring_1.stringify(data),
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        });
        return result.ok ? (await result.json()) : null;
    }
    async fetchData(token) {
        const [user, guilds, connections] = await Promise.all([
            this.fetchInformation('identify', token, 'https://discord.com/api/v8/users/@me'),
            this.fetchInformation('guilds', token, 'https://discord.com/api/v8/users/@me/guilds'),
            this.fetchInformation('connections', token, 'https://discord.com/api/v8/users/@me/connections')
        ]);
        return { user, guilds, connections };
    }
    async fetchInformation(scope, token, url) {
        if (!this.scopes.includes(scope))
            return undefined;
        const result = await node_fetch_1.default(url, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        return result.ok ? (await result.json()) : null;
    }
}
exports.PluginRoute = PluginRoute;
//# sourceMappingURL=login.js.map