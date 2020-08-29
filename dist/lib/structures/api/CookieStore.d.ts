import type { ApiRequest } from './ApiRequest';
import type { ApiResponse } from './ApiResponse';
export declare class CookieStore extends Map<string, string> {
    protected request: ApiRequest;
    protected response: ApiResponse;
    private domain;
    private secure;
    constructor(request: ApiRequest, response: ApiResponse, secure: boolean);
    add(name: string, value: string, options?: SecureCookieStoreSetOptions): void;
    protected insert(name: string, entry: string): void;
    protected prepare(name: string, value: string, { expires, maxAge, domain, path }?: SecureCookieStoreSetOptions): string;
    private static readonly octetRegExp;
    private static encodeCookieOctet;
}
export interface SecureCookieStoreSetOptions {
    expires?: Date;
    maxAge?: number;
    domain?: string;
    path?: string;
}
//# sourceMappingURL=CookieStore.d.ts.map