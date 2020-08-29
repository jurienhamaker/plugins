/// <reference types="node" />
import type { SapphireClient } from '@sapphire/framework';
import { Server as HttpServer } from 'http';
/**
 * @since 1.0.0
 */
export declare class Server {
    /**
     * The http.Server instance that manages the recieved HTTP requests.
     * @since 1.0.0
     */
    readonly server: HttpServer;
    /**
     * The managing Client instance on which this Server instance is mounted.
     * @private
     * @since 1.0.0
     */
    private readonly client;
    /**
     * @since 1.0.0
     * @param client The @sapphire/framework Client instance
     */
    constructor(client: SapphireClient);
}
//# sourceMappingURL=Server.d.ts.map