import type { PieceContext } from '@sapphire/pieces';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { Middleware } from '../lib/structures/Middleware';
import type { Route } from '../lib/structures/Route';
export declare class PluginMiddleware extends Middleware {
    private readonly maximumBodyLength;
    constructor(context: PieceContext);
    run(request: ApiRequest, response: ApiResponse, route: Route | null): Promise<void> | null;
    private textPlain;
    private applicationJson;
    private applicationFormUrlEncoded;
    private loadStringBody;
    private contentStream;
}
//# sourceMappingURL=body.d.ts.map