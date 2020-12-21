/// <reference types="node" />
import type { SapphireClient } from '@sapphire/framework';
import { EventEmitter } from 'events';
import { Server as HttpServer } from 'http';
import { MiddlewareStore } from '../MiddlewareStore';
import { RouteStore } from '../RouteStore';
import { Auth } from './Auth';
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
    readonly routes: RouteStore;
    readonly middlewares: MiddlewareStore;
    readonly auth: Auth | null;
    /**
     * The http.Server instance that manages the recieved HTTP requests.
     * @since 1.0.0
     */
    readonly server: HttpServer;
    /**
     * The managing Client instance on which this Server instance is mounted.
     * @since 1.0.0
     */
    private readonly client;
    /**
     * @since 1.0.0
     * @param client The @sapphire/framework Client instance
     */
    constructor(client: SapphireClient);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
//# sourceMappingURL=Server.d.ts.map