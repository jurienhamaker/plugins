import type { SapphireClient } from '@sapphire/framework';
import type { ApiOptionsAuth } from '../../Api';
export declare class Auth {
    #private;
    id: string;
    cookie: string;
    private constructor();
    get secret(): string;
    /**
     * Encrypts an object with aes-256-cbc to use as a token.
     * @since 1.0.0
     * @param data An object to encrypt
     * @param secret The secret to encrypt the data with
     */
    encrypt(data: AuthData): string;
    /**
     * Decrypts an object with aes-256-cbc to use as a token.
     * @since 1.0.0
     * @param token An data to decrypt
     * @param secret The secret to decrypt the data with
     */
    decrypt(token: string): AuthData;
    static create(client: SapphireClient, options?: ApiOptionsAuth): Auth | null;
}
export interface AuthData {
    id: string;
    expires: number;
    refresh: string;
    token: string;
}
//# sourceMappingURL=Auth.d.ts.map