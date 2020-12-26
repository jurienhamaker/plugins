import { Event, PieceContext } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import type { RouteMatch } from '../lib/structures/RouteStore';
export declare class PluginEvent extends Event {
    constructor(context: PieceContext);
    run(request: ApiRequest, response: ApiResponse, match: RouteMatch): void;
}
//# sourceMappingURL=coreServerMatch.d.ts.map