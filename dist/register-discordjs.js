"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./register");
tslib_1.__exportStar(require("./register"), exports);
const discord_js_1 = require("discord.js");
class I18nextMessage extends discord_js_1.Structures.get('Message') {
    async fetchLanguage() {
        var _a, _b, _c, _d;
        const lang = await this.client.fetchLanguage(this);
        return (_d = (_b = lang !== null && lang !== void 0 ? lang : (_a = this.guild) === null || _a === void 0 ? void 0 : _a.preferredLocale) !== null && _b !== void 0 ? _b : (_c = this.client.options.i18n) === null || _c === void 0 ? void 0 : _c.defaultName) !== null && _d !== void 0 ? _d : 'en-US';
    }
    async fetchT() {
        return this.client.i18n.fetchT(await this.fetchLanguage());
    }
    async resolveKey(key, ...values) {
        return this.client.i18n.fetchLocale(await this.fetchLanguage(), key, ...values);
    }
    async sendTranslated(key, valuesOrOptions, rawOptions) {
        const [values, options] = valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
            ? [valuesOrOptions !== null && valuesOrOptions !== void 0 ? valuesOrOptions : [], rawOptions !== null && rawOptions !== void 0 ? rawOptions : {}]
            : [[], valuesOrOptions];
        const content = await this.fetchLanguageKey(key, ...values);
        return this.channel.send(content, options);
    }
}
discord_js_1.Structures.extend('Message', () => I18nextMessage);
//# sourceMappingURL=register-discordjs.js.map