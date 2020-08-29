import { BasePiece } from '@sapphire/framework';
import { Collection } from 'discord.js';
import { kRoutePathCacheSymbol } from '../Api';
import type { RouteCacheDefinition } from '../decorators/HttpMethods';
import { ParsedPart } from '../utils/pathParsing';
import type { Methods } from './http/HttpMethods';
import type { PieceContext, PieceOptions } from '@sapphire/pieces';
/**
 * @since 1.0.0
 */
export declare abstract class Route extends BasePiece {
    /**
     * @since 1.0.0
     */
    route: string;
    /**
     * @since 1.0.0
     */
    $internalRoutingTable: Collection<Methods, [string, ParsedPart[]][]>;
    /**
     * Internal route remains empty until either the store fills it from piece options or the decorator sets it.
     * Its main function is acting as the main route for the DEFAULT HttpMethod decorators.
     * OR as the base route for decorator defined sub routes.
     * @protected
     * @since 1.0.0
     */
    protected $internalRoute: string;
    constructor(context: PieceContext, { name, ...options }?: PieceOptions);
    matchRoute(method: Methods, split: string[]): string;
    /**
     * @since 1.0.0
     */
    static [kRoutePathCacheSymbol]: RouteCacheDefinition[];
}
//# sourceMappingURL=Route.d.ts.map