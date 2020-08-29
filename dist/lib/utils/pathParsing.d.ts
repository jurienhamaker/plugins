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
/**
 * @since 1.0.0
 */
export declare type ParsedPart = [string, TypeState];
/**
 * @since 1.0.0
 */
export declare function parsePart(value: string): ParsedPart;
/**
 * @since 1.0.0
 */
export declare function split(url: string): string[];
/**
 * @since 1.0.0
 */
export declare function parse(url: string): ParsedPart[];
//# sourceMappingURL=pathParsing.d.ts.map