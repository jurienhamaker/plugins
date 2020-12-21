/**
 * @since 1.0.0
 */
export declare const enum TypeState {
    /**
     * @since 1.0.0
     */
    Static = 0,
    /**
     * @since 1.0.0
     */
    Dynamic = 1
}
export declare type MatchData = Record<string, string> | null;
export declare class RouteData {
    readonly path: string;
    private readonly static;
    private readonly parts;
    constructor(path: string);
    match(split: readonly string[]): MatchData;
    /**
     * @since 1.0.0
     */
    private static parsePart;
    /**
     * @since 1.0.0
     */
    private static split;
}
//# sourceMappingURL=RouteData.d.ts.map