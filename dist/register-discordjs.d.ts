import './register';
export * from './register';
import { I18nextClient, I18nextClientOptions, I18nextGuildImplementation, I18nextChannelImplementation, I18nextMessageImplementation } from './index';
import { Channel, Guild, User } from 'discord.js';
declare module './index' {
    interface I18nGuildContext extends Guild {
    }
    interface I18nChannelContext extends Channel {
    }
    interface I18nAuthorContext extends User {
    }
}
declare module 'discord.js' {
    interface Message extends I18nextMessageImplementation {
        /**
         * @see {@link I18nextMessageImplementation.replyTranslated}
         */
        replyTranslated(key: string, values?: readonly unknown[], options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<I18nextMessageImplementation>;
        replyTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<I18nextMessageImplementation[]>;
        replyTranslated(key: string, options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<I18nextMessageImplementation>;
        replyTranslated(key: string, options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<I18nextMessageImplementation[]>;
        replyTranslated(key: string, valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions, rawOptions?: MessageOptions): Promise<I18nextMessageImplementation | I18nextMessageImplementation[]>;
    }
    interface Channel extends I18nextChannelImplementation {
        /**
         * @see {@link I18nextChannelImplementation.sendTranslated}
         */
        sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<I18nextMessageImplementation>;
        sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<I18nextMessageImplementation[]>;
        sendTranslated(key: string, options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<I18nextMessageImplementation>;
        sendTranslated(key: string, options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<I18nextMessageImplementation[]>;
        sendTranslated(key: string, valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions, rawOptions?: MessageOptions): Promise<I18nextMessageImplementation | I18nextMessageImplementation[]>;
    }
    interface Guild extends I18nextGuildImplementation {
    }
    interface Client extends I18nextClient {
    }
    interface ClientOptions extends I18nextClientOptions {
    }
}
//# sourceMappingURL=register-discordjs.d.ts.map