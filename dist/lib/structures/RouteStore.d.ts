import { BaseStore, SapphireClient } from '@sapphire/framework';
import { Collection } from 'discord.js';
import type { Methods } from './http/HttpMethods';
import { Route } from './Route';
/**
 * @since 1.0.0
 */
export declare class RouteStore extends BaseStore<Route> {
    routingTable: Collection<Methods, Collection<string, Route>>;
    constructor(client: SapphireClient);
}
//# sourceMappingURL=RouteStore.d.ts.map