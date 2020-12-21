import { BasePiece } from '@sapphire/framework';
import type { PieceContext, PieceOptions } from '@sapphire/pieces';
import type { Awaited } from '@sapphire/utilities';
import { Collection } from 'discord.js';
import { RouteData } from '../utils/RouteData';
import { Methods } from './http/HttpMethods';
import type { MethodCallback } from './RouteStore';
/**
 * @since 1.0.0
 */
export declare abstract class Route extends BasePiece {
    /**
     * (RFC 7230 3.3.2) The maximum decimal number of octets.
     */
    readonly maximumBodyLength: number;
    /**
     * The route information.
     */
    readonly router: RouteData;
    /**
     * The methods this route accepts.
     */
    readonly methods: Collection<Methods, MethodCallback>;
    constructor(context: PieceContext, options?: RouteOptions);
    /**
     * Per-piece listener that is called when the piece is loaded into the store.
     * Useful to set-up asynchronous initialization tasks.
     */
    onLoad(): Awaited<unknown>;
    /**
     * Per-piece listener that is called when the piece is unloaded from the store.
     * Useful to set-up clean-up tasks.
     */
    onUnload(): Awaited<unknown>;
}
export interface RouteOptions extends PieceOptions {
    /**
     * The route the piece should represent.
     * @default ''
     * @example
     * ```typescript
     * '/users'
     * // request.params -> {}
     * ```
     * @example
     * ```typescript
     * '/guilds/:guild/members/:member/'
     * // request.params -> { guild: '...', member: '...' }
     * ```
     */
    route?: string;
    /**
     * (RFC 7230 3.3.2) The maximum decimal number of octets.
     * @default this.client.options.api?.maximumBodyLength ?? 1024 * 1024 * 50
     */
    maximumBodyLength?: number;
}
//# sourceMappingURL=Route.d.ts.map