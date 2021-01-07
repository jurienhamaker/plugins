import type { TFunction } from 'i18next';
import type { I18nextClient, I18nGuildContext, I18nChannelContext, I18nAuthorContext } from './types/index';
declare type Ctor = new (...args: any[]) => {
    client: I18nextClient;
};
/**
 * @since 1.0.0
 * @returns An I18nextImplementation mixin which extends the Base parameter and fully implements {@link I18nextBaseImplementation}.
 * @param Base The class to use as the base for the implementation (e.g. a Discord library's Message object)
 */
export declare function I18nextImplemented<BaseClass extends Ctor>(Base: BaseClass): {
    new (...args: any[]): {
        /**
         * Accessor for {@link I18nextClient.fetchLanguage} with context applied.
         * To use this in an implementation, create a new function called `fetchLanguage` and execute this with context applied.
         * This can be overwritten if you want to specify a different order of defaulting.
         * @since 1.0.0
         * @see {@link I18nextBaseImplementation.fetchLanguage}
         **/
        _fetchLanguage(guild?: I18nGuildContext | null | undefined, channel?: I18nChannelContext | null | undefined, author?: I18nAuthorContext | null | undefined): Promise<string>;
        /**
         * Method to be overwritten to apply context to {@link I18nextImplementation._fetchLanguage}
         * @since 1.0.0
         */
        fetchLanguage(): Promise<string>;
        /**
         * @since 1.0.0
         * @see {@link I18nextBaseImplementation.resolveKey}
         */
        fetchT(): Promise<TFunction>;
        /**
         * @since 1.0.0
         * @see {@link I18nextBaseImplementation.resolveKey}
         */
        resolveKey(key: string, ...values: readonly any[]): Promise<string>;
        client: I18nextClient;
    };
} & BaseClass;
export {};
//# sourceMappingURL=I18nextImplementation.d.ts.map