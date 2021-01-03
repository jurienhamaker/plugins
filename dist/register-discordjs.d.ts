import './register';
export * from './register';
import type { TFunction } from 'i18next';
import type { I18nextHandler, I18nOptions, I18nContext } from './index';
import { Channel, Guild } from 'discord.js';
declare module './index' {
    interface I18nGuildContext extends Guild {
    }
    interface I18nChannelContext extends Channel {
    }
    interface I18nAuthorContext extends Channel {
    }
}
declare module 'discord.js' {
    interface Message {
        /**
         * Accessor for {@link I18nextPlugin#fetchLanguage} that implements an order of preference for locales.
         * @since 1.0.0
         * @return In preference order, {@link I18nextPlugin#fetchLanguage} -> the guild's preferredLocale -> {@link I18nextOptions#defaultName} -> 'en-US'.
         */
        fetchLanguage(): Promise<string>;
        /**
         * Function that gets a TFunction (translator function) from i18next.
         * @since 1.0.0
         * @return An i18next TFunction.
         */
        fetchT(): Promise<TFunction>;
        /**
         * Function that resolves a language key from the store.
         * @since 1.0.0
         * @return A string, which is the translated result of the key, with templated values.
         */
        resolveKey(key: string, ...values: readonly any[]): Promise<string>;
        /**
         * Function that sends a response message for the context channel with the translated key and values.
         * Functionally equivalent to piping resolveKey through Message#reply.
         * @since 1.0.0
         * @return The message object that was sent.
         */
        replyTranslated(key: string, values?: readonly unknown[], options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<Message>;
        replyTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<Message[]>;
        replyTranslated(key: string, options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<Message>;
        replyTranslated(key: string, options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<Message[]>;
        replyTranslated(key: string, valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions, rawOptions?: MessageOptions): Promise<Message | Message[]>;
        /**
         * Function that edits a message with the translated key and values.
         * Functionally equivalent to piping resolveKey through Message#edit.
         * @since 1.0.0
         * @return The message object that was edited.
         */
        editTranslated(key: string, values?: readonly unknown[], options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<Message>;
        editTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<Message[]>;
        editTranslated(key: string, options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<Message>;
        editTranslated(key: string, options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<Message[]>;
        editTranslated(key: string, valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions, rawOptions?: MessageOptions): Promise<Message | Message[]>;
    }
    interface Channel {
        /**
         * Accessor for {@link I18nextPlugin#fetchLanguage} that implements an order of preference for locales.
         * @since 1.0.0
         * @return In preference order, {@link I18nextPlugin#fetchLanguage} -> the guild's preferredLocale -> {@link I18nextOptions#defaultName} -> 'en-US'.
         */
        fetchLanguage(): Promise<string>;
        /**
         * Function that gets a TFunction (translator function) from i18next.
         * @since 1.0.0
         * @return An i18next TFunction.
         */
        fetchT(): Promise<TFunction>;
        /**
         * Function that resolves a language key from the store.
         * @since 1.0.0
         * @return A string, which is the translated result of the key, with templated values.
         */
        resolveKey(key: string, ...values: readonly any[]): Promise<string>;
        /**
         * Function that sends a message for the channel with the translated key and values.
         * Functionally equivalent to piping resolveKey through Channel#send.
         * @since 1.0.0
         * @return The message object that was sent.
         */
        sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<Message>;
        sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<Message[]>;
        sendTranslated(key: string, options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<Message>;
        sendTranslated(key: string, options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<Message[]>;
        sendTranslated(key: string, valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions, rawOptions?: MessageOptions): Promise<Message | Message[]>;
    }
    interface Guild {
        /**
         * Accessor for {@link I18nextPlugin#fetchLanguage} that implements an order of preference for locales.
         * @since 1.0.0
         * @return In preference order, {@link I18nextPlugin#fetchLanguage} -> the guild's preferredLocale -> {@link I18nextOptions#defaultName} -> 'en-US'.
         */
        fetchLanguage(): Promise<string>;
        /**
         * Function that gets a TFunction (translator function) from i18next.
         * @since 1.0.0
         * @return An i18next TFunction.
         */
        fetchT(): Promise<TFunction>;
        /**
         * Function that resolves a language key from the store.
         * @since 1.0.0
         * @return A string, which is the translated result of the key, with templated values.
         */
        resolveKey(key: string, ...values: readonly any[]): Promise<string>;
    }
    interface Client {
        /**
         * See: {@link I18nextHandler}
         * @since 1.0.0
         */
        i18n: I18nextHandler;
        /**
         * The method to be overriden by the developer.
         * Note: In the event that fetchLanguage is not defined or returns null or undefined
         * the order of defaulting will be as follows:
         * client.fetchLanguage -> message.guild.preferredLocale -> this.client.options.i18n.defaultName -> 'en-US'
         * @since 1.0.0
         * @return A string for the desired language or null for no match.
         * @example
         * ```typescript
         * // Always use the same language (no per-guild configuration):
         * client.fetchLanguage = () => 'en-US';
         * ```
         * @example
         * ```typescript
         * // Retrieving the prefix from an SQL database:
         * client.fetchLanguage = async (message) => {
         *   const guild = await driver.getOne('SELECT language FROM public.guild WHERE id = $1', [message.guild.id]);
         *   return guild?.language ?? 'en-US';
         * };
         * ```
         * @example
         * ```typescript
         * // Retrieving the language from an ORM:
         * client.fetchLanguage = async (message) => {
         *   const guild = await driver.getRepository(GuildEntity).findOne({ id: message.guild.id });
         *   return guild?.language ?? 'en-US';
         * };
         * ```
         */
        fetchLanguage: (context: I18nContext) => Promise<string | null> | string | null;
    }
    interface ClientOptions {
        /**
         * See: {@link I18nOptions}
         * @since 1.0.0
         */
        i18n?: I18nOptions;
        /**
         * Hook that returns the name of a language, or {@link I18nOptions#defaultName} by default.
         * @since 1.0.0
         * @default () => client.options.defaultLanguage
         */
        fetchLanguage?: (context: I18nContext) => Promise<string | null> | string | null;
    }
}
//# sourceMappingURL=register-discordjs.d.ts.map