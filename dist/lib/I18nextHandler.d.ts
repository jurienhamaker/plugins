import { Awaited } from '@sapphire/utilities';
import { StringMap, TFunction, TOptions } from 'i18next';
import type { I18nOptions } from './types/options';
/**
 * A generalised class for handling `i18next` JSON files and their discovery.
 * @since 1.0.0
 */
export declare class I18nextHandler {
    /**
     * Describes whether `I18nextHandler#init` has been run and languages are loaded in `I18nextHandler.languages`.
     * @since 1.0.0
     */
    languagesLoaded: boolean;
    /**
     * A `Map` of `i18next` language functions keyed by their language code.
     * @since 1.0.0
     */
    readonly languages: Map<string, TFunction>;
    private readonly options?;
    private readonly languagesDir;
    private readonly backendOptions;
    /**
     * @param options The options that `i18next`, `i18next-fs-backend`, and {@link I18nextHandler} should use.
     * @since 1.0.0
     * @constructor
     */
    constructor(options?: I18nOptions);
    /**
     * Intitialises the handler by loading in the namespaces, passing the data to i18next, and filling in the {@link I18nextHandler#languages}.
     * @since 1.0.0
     */
    init(): Promise<void>;
    /**
     * Retrieve a raw TFunction from the passed locale.
     * @param locale The language to be used.
     * @since 1.0.0
     */
    fetchT(locale: string): TFunction;
    /**
     * Resolves a localised string from a language code, key, optional replaceables, and optional i18next options.
     * @param locale The language to be used.
     * @param key The key that should be translated.
     * @param replace The replaceable keys in translation string.
     * @param options i18next language options.
     * @since 1.0.0
     */
    fetchLocale(locale: string, key: string, replace?: Record<string, unknown>, options?: TOptions<StringMap>): Awaited<string>;
    /**
     * @description Skips any files that don't end with `.json`.
     * @param dir The directory that should be walked.
     * @param namespaces The currently known namespaces.
     * @param current The directory currently being traversed.
     * @since 1.0.0
     * @protected
     */
    protected walkLanguageDirectory(dir: string, namespaces?: string[], current?: string): Promise<{
        namespaces: string[];
        languages: string[];
    }>;
}
//# sourceMappingURL=I18nextHandler.d.ts.map