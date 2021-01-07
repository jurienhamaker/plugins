import { Plugin, preGenericsInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import { I18nextClient, I18nextClientOptions } from './index';
export declare class I18nextPlugin extends Plugin {
    static [preGenericsInitialization](this: I18nextClient, options: I18nextClientOptions): void;
    static [preLogin](this: SapphireClient): Promise<void>;
}
declare module '@sapphire/framework' {
    interface SapphireClient extends I18nextClient {
    }
    interface SapphireClientOptions extends I18nextClientOptions {
    }
}
//# sourceMappingURL=register.d.ts.map