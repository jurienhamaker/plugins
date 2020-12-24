import { Event, PieceContext } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { Server, ServerOptions } from '../lib/structures/http/Server';
import type { RouteMatch } from '../lib/structures/RouteStore';
export declare class PluginEvent extends Event {
    constructor(context: PieceContext);
    run(request: ApiRequest, response: ApiResponse, match: RouteMatch): Promise<void>;
}
declare module 'discord.js' {
    interface Client {
        server: Server;
    }
    interface ClientOptions {
        api?: ServerOptions;
    }
}
//# sourceMappingURL=coreServerMatch.d.ts.map