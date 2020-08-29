/// <reference types="node" />
import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import type { ServerOptions } from 'https';
import { Server } from './structures/http/Server';
export declare const kRoutePathCacheSymbol: unique symbol;
/**
 * @since 1.0.0
 */
export declare class Api implements Plugin {
    /**
     * @since 1.0.0
     */
    static postInitializationHook(this: SapphireClient, _options?: ClientOptions): void;
    /**
     * @since 1.0.0
     */
    static [postInitialization](scopedThis: SapphireClient, options?: ClientOptions): void;
}
/**
 * @since 1.0.0
 */
export interface ApiOptions {
    /**
     * @since 1.0.0
     */
    prefix: string;
    /**
     * @since 1.0.0
     */
    server: ServerOptions;
}
declare module 'discord.js' {
    interface Client {
        server: Server;
    }
    interface ClientOptions {
        api: ApiOptions;
    }
}
//# sourceMappingURL=Api.d.ts.map