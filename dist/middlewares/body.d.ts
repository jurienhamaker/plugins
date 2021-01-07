import type { PieceContext } from '@sapphire/pieces';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { Middleware } from '../lib/structures/Middleware';
import type { Route } from '../lib/structures/Route';
export declare class PluginMiddleware extends Middleware {
    private readonly mediaParsers;
    constructor(context: PieceContext);
    run(request: ApiRequest, response: ApiResponse, route: Route): Promise<void>;
}
//# sourceMappingURL=body.d.ts.map