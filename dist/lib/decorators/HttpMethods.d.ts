import { Methods } from '../structures/http/HttpMethods';
/**
 * @since 1.0.0
 * @private
 * @param httpMethod The standard Http method for the specified route.
 * @param route The route on which this method should answer.
 */
export declare function createHttpMethodDecorator(httpMethod: Methods, _route?: string): (target: Record<PropertyKey, unknown>, method: string) => void;
/**
 * @since 1.0.0
 */
export interface RouteCacheDefinition {
    /**
     * @since 1.0.0
     */
    method: string;
    /**
     * @since 1.0.0
     */
    route: string;
    /**
     * @since 1.0.0
     */
    httpMethod: Methods;
}
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export declare const HttpGet: (route?: string | undefined) => (target: Record<PropertyKey, unknown>, method: string) => void;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export declare const HttpHead: (route?: string | undefined) => (target: Record<PropertyKey, unknown>, method: string) => void;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export declare const HttpPost: (route?: string | undefined) => (target: Record<PropertyKey, unknown>, method: string) => void;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export declare const HttpPut: (route?: string | undefined) => (target: Record<PropertyKey, unknown>, method: string) => void;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export declare const HttpDelete: (route?: string | undefined) => (target: Record<PropertyKey, unknown>, method: string) => void;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export declare const HttpConnect: (route?: string | undefined) => (target: Record<PropertyKey, unknown>, method: string) => void;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export declare const HttpOptions: (route?: string | undefined) => (target: Record<PropertyKey, unknown>, method: string) => void;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export declare const HttpTrace: (route?: string | undefined) => (target: Record<PropertyKey, unknown>, method: string) => void;
/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export declare const HttpPatch: (route?: string | undefined) => (target: Record<PropertyKey, unknown>, method: string) => void;
//# sourceMappingURL=HttpMethods.d.ts.map