"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./register");
tslib_1.__exportStar(require("./register"), exports);
const discord_js_1 = require("discord.js");
async function fetchLanguage(client, guild, channel, author) {
    var _a, _b, _c, _d;
    const lang = await client.fetchLanguage({
        guild,
        channel,
        author
    });
    return (_d = (_a = lang !== null && lang !== void 0 ? lang : guild === null || guild === void 0 ? void 0 : guild.preferredLocale) !== null && _a !== void 0 ? _a : (_c = (_b = client.i18n) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.defaultName) !== null && _d !== void 0 ? _d : 'en-US';
}
class I18nextMessage extends discord_js_1.Structures.get('Message') {
    async fetchLanguage() {
        return fetchLanguage(this.client, this.guild, this.channel, this.author);
    }
    async fetchT() {
        return this.client.i18n.fetchT(await this.fetchLanguage());
    }
    async resolveKey(key, ...values) {
        return this.client.i18n.fetchLocale(await this.fetchLanguage(), key, ...values);
    }
    async replyTranslated(key, valuesOrOptions, rawOptions) {
        const [values, options] = valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
            ? [valuesOrOptions !== null && valuesOrOptions !== void 0 ? valuesOrOptions : [], rawOptions !== null && rawOptions !== void 0 ? rawOptions : {}]
            : [[], valuesOrOptions];
        return this.reply(await this.resolveKey(key, ...values), options);
    }
    async editTranslated(key, valuesOrOptions, rawOptions) {
        const [values, options] = valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
            ? [valuesOrOptions !== null && valuesOrOptions !== void 0 ? valuesOrOptions : [], rawOptions !== null && rawOptions !== void 0 ? rawOptions : {}]
            : [[], valuesOrOptions];
        return this.edit(await this.resolveKey(key, ...values), options);
    }
}
class I18nextTextChannel extends discord_js_1.Structures.get('TextChannel') {
    async fetchLanguage() {
        return fetchLanguage(this.client, this.guild, this, undefined);
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
        return this.send(await this.resolveKey(key, ...values), options);
    }
}
class I18nextDMChannel extends discord_js_1.Structures.get('DMChannel') {
    async fetchLanguage() {
        return fetchLanguage(this.client, undefined, this, undefined);
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
        return this.send(await this.resolveKey(key, ...values), options);
    }
}
class I18nextNewsChannel extends discord_js_1.Structures.get('NewsChannel') {
    async fetchLanguage() {
        return fetchLanguage(this.client, this.guild, this, undefined);
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
        return this.send(await this.resolveKey(key, ...values), options);
    }
}
class I18nextGuild extends discord_js_1.Structures.get('Guild') {
    async fetchLanguage() {
        return fetchLanguage(this.client, this, undefined, undefined);
    }
    async fetchT() {
        return this.client.i18n.fetchT(await this.fetchLanguage());
    }
    async resolveKey(key, ...values) {
        return this.client.i18n.fetchLocale(await this.fetchLanguage(), key, ...values);
    }
}
discord_js_1.Structures.extend('Message', () => I18nextMessage);
discord_js_1.Structures.extend('TextChannel', () => I18nextTextChannel);
discord_js_1.Structures.extend('DMChannel', () => I18nextDMChannel);
discord_js_1.Structures.extend('NewsChannel', () => I18nextNewsChannel);
discord_js_1.Structures.extend('Guild', () => I18nextGuild);
//# sourceMappingURL=register-discordjs.js.map