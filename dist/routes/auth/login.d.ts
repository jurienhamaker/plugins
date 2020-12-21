import type { PieceContext } from '@sapphire/pieces';
import type { RESTGetAPICurrentUserConnectionsResult, RESTGetAPICurrentUserGuildsResult, RESTGetAPICurrentUserResult } from 'discord-api-types/v8';
import { Route } from '../../lib/structures/Route';
export declare class PluginRoute extends Route {
    private readonly scopes;
    private readonly scopeString;
    private readonly redirectUri;
    constructor(context: PieceContext);
    private fetchAuth;
    private fetchData;
    private fetchInformation;
}
export interface LoginData {
    user?: RESTGetAPICurrentUserResult | null;
    guilds?: RESTGetAPICurrentUserGuildsResult | null;
    connections?: RESTGetAPICurrentUserConnectionsResult | null;
}
//# sourceMappingURL=login.d.ts.map