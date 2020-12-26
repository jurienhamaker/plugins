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
/**
 * The OAuth2 body data sent to the callback.
 * @since 1.2.0
 */
export interface OAuth2BodyData {
    /**
     * The code sent by the client.
     * @since 1.2.0
     */
    code: string;
    /**
     * The client's ID.
     * @since 1.2.0
     */
    clientId: string;
    /**
     * The redirect URI.
     * @since 1.2.0
     */
    redirectUri: string;
}
//# sourceMappingURL=callback.d.ts.map