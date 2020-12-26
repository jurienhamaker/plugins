import { Piece, PieceContext, PieceOptions } from '@sapphire/pieces';
import type { Awaited } from '@sapphire/utilities';
import type { ApiRequest } from './api/ApiRequest';
import type { ApiResponse } from './api/ApiResponse';
import type { Route } from './Route';
/**
 * @since 1.0.0
 */
export declare abstract class Middleware extends Piece {
    /**
     * The position the middleware has. The {@link MiddlewareStore} will run all middlewares with lower position than
     * this one.
     *
     * The built-in middlewares follow the following positions:
     * - headers: 10
     * - body: 20
     * - cookies: 30
     * - auth: 40
     */
    readonly position: number;
    constructor(context: PieceContext, options?: MiddlewareOptions);
    /**
     * The method to be overridden by other middlewares.
     * @param request The client's request.
     * @param response The server's response.
     * @param route The route that matched this request, will be `null` if none matched.
     */
    abstract run(request: ApiRequest, response: ApiResponse, route: Route | null): Awaited<unknown>;
}
/**
 * The options for all middlewares.
 */
export interface MiddlewareOptions extends PieceOptions {
    /**
     * The position to insert the middleware at.
     * @see Middleware#position
     * @default 1000
     */
    position?: number;
}
//# sourceMappingURL=Middleware.d.ts.map