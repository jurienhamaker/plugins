import { Plugin, preGenericsInitialization, preLogin, SapphireClient, SapphireClientOptions } from '@sapphire/framework';
import { I18nextHandler, I18nOptions, I18nContext } from './index';
export declare class I18nextPlugin extends Plugin {
    static [preGenericsInitialization](this: SapphireClient, options: SapphireClientOptions): void;
    static [preLogin](this: SapphireClient): Promise<void>;
}
declare module '@sapphire/framework' {
    interface SapphireClient {
        i18n: I18nextHandler;
        /**
         * The method to be overriden by the developer.
         * Note: In the event that fetchLanguage is not defined or returns null or undefined
         * the order of defaulting will be as follows:
         * client.fetchLanguage -> guild.preferredLocale -> client.options.i18n.defaultName -> 'en-US'
         * @since 1.0.0
         * @return A string for the desired language or null for no match.
         * @example
         * ```typescript
         * // Always use the same language (no per-guild configuration):
         * client.fetchLanguage = () => 'en-US';
         * ```
         * @example
         * ```typescript
         * // Retrieving the language from an SQL database:
         * client.fetchLanguage = async (context) => {
         *   const guild = await driver.getOne('SELECT language FROM public.guild WHERE id = $1', [context.guild.id]);
         *   return guild?.language ?? 'en-US';
         * };
         * ```
         * @example
         * ```typescript
         * // Retrieving the language from an ORM:
         * client.fetchLanguage = async (context) => {
         *   const guild = await driver.getRepository(GuildEntity).findOne({ id: context.guild.id });
         *   return guild?.language ?? 'en-US';
         * };
         * ```
         * @example
         * ```typescript
         * // Retrieving the language on a per channel basis, e.g. per user or guild channel (ORM example but same principles apply):
         * client.fetchLanguage = async (context) => {
         *   const channel = await driver.getRepository(ChannelEntity).findOne({ id: context.channel.id });
         *   return channel?.language ?? 'en-US';
         * };
         * ```
         */
        fetchLanguage: (context: I18nContext) => Promise<string | null> | string | null;
    }
    interface SapphireClientOptions {
        i18n?: I18nOptions;
        /**
         * Hook that returns the name of a language, or {@link I18nOptions#defaultName} by default.
         * @since 1.0.0
         * @default () => client.options.defaultLanguage
         */
        fetchLanguage?: (context: I18nContext) => Promise<string | null> | string | null;
    }
}
//# sourceMappingURL=register.d.ts.map