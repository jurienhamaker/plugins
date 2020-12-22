import type { PieceContext } from '@sapphire/pieces';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { Middleware } from '../lib/structures/Middleware';
export declare class PluginMiddleware extends Middleware {
    private readonly origin;
    private readonly methods;
    constructor(context: PieceContext);
    run(request: ApiRequest, response: ApiResponse): void;
}
//# sourceMappingURL=headers.d.ts.map