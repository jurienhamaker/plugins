import { Plugin, postInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { Server, ServerOptions } from './lib/structures/http/Server';
/**
 * @since 1.0.0
 */
export declare class Api extends Plugin {
    /**
     * @since 1.0.0
     */
    static [postInitialization](this: SapphireClient, options: ClientOptions): void;
    /**
     * @since 1.0.0
     */
    static [preLogin](this: SapphireClient): Promise<void>;
}
declare module 'discord.js' {
    interface Client {
        server: Server;
    }
    interface ClientOptions {
        api?: ServerOptions;
    }
}
//# sourceMappingURL=register.d.ts.map