/// <reference types="node" />
import { EventEmitter } from 'events';
import { Server as HttpServer, ServerOptions as HttpOptions } from 'http';
import type { ListenOptions } from 'net';
import { MiddlewareStore } from '../MiddlewareStore';
import { RouteStore } from '../RouteStore';
import { Auth, ServerOptionsAuth } from './Auth';
export declare const enum ServerEvents {
    Error = "error",
    Request = "request",
    Match = "match",
    NoMatch = "noMatch",
    MiddlewareFailure = "middlewareFailure",
    MiddlewareError = "middlewareError",
    MiddlewareSuccess = "middlewareSuccess"
}
/**
 * @since 1.0.0
 */
export declare class Server extends EventEmitter {
    /**
     * The routes this server holds.
     * @since 1.0.0
     */
    readonly routes: RouteStore;
    /**
     * The middlewares this server holds.
     * @since 1.0.0
     */
    readonly middlewares: MiddlewareStore;
    /**
     * The authentication system.
     * @since 1.0.0
     */
    readonly auth: Auth | null;
    /**
     * The http.Server instance that manages the recieved HTTP requests.
     * @since 1.0.0
     */
    readonly server: HttpServer;
    /**
     * The options for this server.
     * @since 1.0.0
     */
    readonly options: AuthLessServerOptions;
    /**
     * @since 1.0.0
     * @param options The options for this server
     */
    constructor({ auth, ...options }?: ServerOptions);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
/**
 * The API options.
 * @since 1.0.0
 */
export interface ServerOptions {
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
    server?: HttpOptions;
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
    auth?: ServerOptionsAuth;
}
/**
 * The [[ServerOptions]] without [[ServerOptions.auth]].
 * @since 1.0.0
 */
export declare type AuthLessServerOptions = Omit<ServerOptions, 'auth'>;
declare module '@sapphire/pieces' {
    interface PieceContextExtras {
        server: Server;
    }
}
//# sourceMappingURL=Server.d.ts.map