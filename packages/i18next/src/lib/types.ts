import type { Awaited } from '@sapphire/utilities';
import type { Guild, Message, StageChannel, StoreChannel, User, VoiceChannel } from 'discord.js';
import type { InitOptions } from 'i18next';
import type { i18nextFsBackend } from 'i18next-fs-backend';

/**
 * Used to dynamically add options based on found languages in {@link InternationalizationHandler#init}.
 * @since 1.1.0
 * @private
 */
export type DynamicOptions<T extends InitOptions> = (namespaces: string[], languages: string[]) => T;

/**
 * The options used in {@link InternationalizationHandler}.
 * @since 1.0.0
 */
export interface InternationalizationOptions {
	/**
	 * Used as the default 2nd to last fallback locale if no other is found.
	 * It's only followed by "en-US".
	 * @since 1.0.0
	 */
	defaultName?: string;

	/**
	 * The options passed to `backend` in `i18next.init`.
	 * @since 1.0.0
	 */
	backend?: i18nextFsBackend.i18nextFsBackendOptions;

	/**
	 * The options passed to `i18next.init`.
	 * @since 1.0.0
	 */
	i18next?: InitOptions | DynamicOptions<InitOptions>;

	/**
	 * The directory in which "i18next-fs-backend" should search for files.
	 * Defaults to "<rootDirectory>/languages".
	 * @since 1.0.0
	 */
	defaultLanguageDirectory?: string;

	/**
	 * The default value to be used if a specific language key isn't found.
	 * Defaults to "default:default".
	 * @since 1.0.0
	 */
	defaultMissingKey?: string;

	/**
	 * The default NS that is prefixed to all keys that don't specify it.
	 * Defaults to "default".
	 * @since 1.0.0
	 */
	defaultNS?: string;
	/**
	 * A function that is to be used to retrieve the language for the current context.
	 * Context exists of a {@link Guild `guild`}, a {@link DiscordChannel `channel`} and a {@link User `user`}.
	 *
	 * If this is not set, then the language will always be the default language.
	 *
	 * This will be inserted for {@link InternationalizationHandler.fetchLanguage}.
	 * @since 2.0.0
	 * @default () => InternationalizationOptions.defaultName
	 */
	fetchLanguage?: (context: InternationalizationContext) => Awaited<string | null>;
}

export type TextBasedDiscordChannel = Message['channel'];
export type DiscordChannel = TextBasedDiscordChannel | StoreChannel | StageChannel | VoiceChannel;

/**
 * Context for {@link InternationalizationHandler.fetchLanguage} functions.
 * This context enables implementation of per-guild, per-channel, and per-user localization.
 */
export interface InternationalizationContext {
	guild: Guild | null;
	channel: DiscordChannel | null;
	author: User | null;
}

export interface InternationalizationClientOptions {
	i18n?: InternationalizationOptions;
}
