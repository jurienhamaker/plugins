import { Event, PieceContext } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
export declare class PluginEvent extends Event {
    constructor(context: PieceContext);
    run(_: ApiRequest, response: ApiResponse): void;
}
//# sourceMappingURL=coreServerNoMatch.d.ts.map