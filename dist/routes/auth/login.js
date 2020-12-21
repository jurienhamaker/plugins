"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginRoute = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const querystring_1 = require("querystring");
require("../../lib/structures/http/HttpCodes");
const HttpMethods_1 = require("../../lib/structures/http/HttpMethods");
const Route_1 = require("../../lib/structures/Route");
class PluginRoute extends Route_1.Route {
    constructor(context) {
        var _a, _b, _c, _d, _e;
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
        this.enabled = this.client.server.auth !== null;
        this.scopes = (_c = (_b = (_a = this.client.options.api) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.scopes) !== null && _c !== void 0 ? _c : ['identify'];
        this.scopeString = this.scopes.join(' ');
        this.redirectUri = (_e = (_d = this.client.options.api) === null || _d === void 0 ? void 0 : _d.auth) === null || _e === void 0 ? void 0 : _e.redirect;
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
        const auth = this.client.server.auth;
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
        const data = {
            /* eslint-disable @typescript-eslint/naming-convention */
            client_id: this.client.server.auth.id,
            client_secret: this.client.server.auth.secret,
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