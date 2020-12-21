/// <reference types="node" />
import { Plugin, postInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import type { ServerOptions } from 'http';
import type { ListenOptions } from 'net';
import { Server } from './structures/http/Server';
/**
 * @since 1.0.0
 */
export declare class Api extends Plugin {
    /**
     * @since 1.0.0
     */
    static [postInitialization](this: SapphireClient): void;
    /**
     * @since 1.0.0
     */
    static [preLogin](this: SapphireClient): Promise<void>;
}
/**
 * Defines the authentication options.
 * @since 1.0.0
 */
export interface ApiOptionsAuth {
    /**
     * The client's application id.
     * @since 1.0.0
     * @default client.id ?? client.options.id
     */
    id?: string;
    /**
     * The name for the cookie, this will be used to identify a Secure HttpOnly cookie.
     * @since 1.0.0
     * @default 'SAPPHIRE_AUTH'
     */
    cookie?: string;
    /**
     * The client secret, this can be retrieved in Discord Developer Portal at https://discord.com/developers/applications.
     * @since 1.0.0
     * @default null
     */
    secret?: string | null;
    /**
     * The scopes defined at https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes.
     * @since 1.0.0
     * @default ['identify']
     */
    scopes?: string[];
    /**
     * The redirect uri.
     * @since 1.0.0
     */
    redirect?: string;
}
/**
 * The API options.
 * @since 1.0.0
 */
export interface ApiOptions {
    /**
     * The prefix for all routes, e.g. `v1/`.
     * @since 1.0.0
     * @default ''
     */
    prefix?: string;
    /**
     * The origin header to be set on every request at 'Access-Control-Allow-Origin'.
     * @since 1.0.0
     * @default '*'
     */
    origin?: string;
    /**
     * (RFC 7230 3.3.2) The maximum decimal number of octets.
     * @since 1.0.0
     * @default 1024 * 1024 * 50
     */
    maximumBodyLength?: number;
    /**
     * The HTTP server options.
     * @since 1.0.0
     * @default {}
     */
    server?: ServerOptions;
    /**
     * The HTTP listen options.
     * @since 1.0.0
     * @default { port: 4000 }
     */
    listenOptions?: ListenOptions;
    /**
     * The auth options. If neither `auth` nor `auth.secret` are defined, auth-related routes and middlewares will be
     * automatically disabled.
     * @since 1.0.0
     * @default {}
     */
    auth?: ApiOptionsAuth;
}
declare module 'discord.js' {
    interface Client {
        server: Server;
    }
    interface ClientOptions {
        api?: ApiOptions;
    }
}
//# sourceMappingURL=Api.d.ts.map