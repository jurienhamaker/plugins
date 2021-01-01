"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nextPlugin = void 0;
const framework_1 = require("@sapphire/framework");
const index_1 = require("./index");
class I18nextPlugin extends framework_1.Plugin {
    static [framework_1.preGenericsInitialization](options) {
        var _a;
        this.i18n = new index_1.I18nextHandler(options.i18n);
        this.fetchLanguage = (_a = options.fetchLanguage) !== null && _a !== void 0 ? _a : (() => null);
    }
    static async [framework_1.preLogin]() {
        await this.i18n.init();
    }
}
exports.I18nextPlugin = I18nextPlugin;
framework_1.SapphireClient.plugins.registerPostInitializationHook(I18nextPlugin[framework_1.preGenericsInitialization], 'I18next-PreGenericsInitialization');
framework_1.SapphireClient.plugins.registerPreLoginHook(I18nextPlugin[framework_1.preLogin], 'I18next-PreLogin');
//# sourceMappingURL=register.js.map