"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./register");
tslib_1.__exportStar(require("./register"), exports);
const index_1 = require("./index");
const discord_js_1 = require("discord.js");
class I18nextMessage extends index_1.I18nextImplemented(discord_js_1.Structures.get('Message')) {
    async fetchLanguage() {
        return this._fetchLanguage(this.guild, this.channel, this.author);
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
class I18nextTextChannel extends index_1.I18nextImplemented(discord_js_1.Structures.get('TextChannel')) {
    async fetchLanguage() {
        return this._fetchLanguage(this.guild, this, undefined);
    }
    async sendTranslated(key, valuesOrOptions, rawOptions) {
        const [values, options] = valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
            ? [valuesOrOptions !== null && valuesOrOptions !== void 0 ? valuesOrOptions : [], rawOptions !== null && rawOptions !== void 0 ? rawOptions : {}]
            : [[], valuesOrOptions];
        return this.send(await this.resolveKey(key, ...values), options);
    }
}
class I18nextDMChannel extends index_1.I18nextImplemented(discord_js_1.Structures.get('DMChannel')) {
    async fetchLanguage() {
        return this._fetchLanguage(undefined, this, undefined);
    }
    async sendTranslated(key, valuesOrOptions, rawOptions) {
        const [values, options] = valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
            ? [valuesOrOptions !== null && valuesOrOptions !== void 0 ? valuesOrOptions : [], rawOptions !== null && rawOptions !== void 0 ? rawOptions : {}]
            : [[], valuesOrOptions];
        return this.send(await this.resolveKey(key, ...values), options);
    }
}
class I18nextNewsChannel extends index_1.I18nextImplemented(discord_js_1.Structures.get('NewsChannel')) {
    async fetchLanguage() {
        return this._fetchLanguage(this.guild, this, undefined);
    }
    async sendTranslated(key, valuesOrOptions, rawOptions) {
        const [values, options] = valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
            ? [valuesOrOptions !== null && valuesOrOptions !== void 0 ? valuesOrOptions : [], rawOptions !== null && rawOptions !== void 0 ? rawOptions : {}]
            : [[], valuesOrOptions];
        return this.send(await this.resolveKey(key, ...values), options);
    }
}
class I18nextGuild extends index_1.I18nextImplemented(discord_js_1.Structures.get('Guild')) {
    async fetchLanguage() {
        return this._fetchLanguage(this, undefined, undefined);
    }
}
discord_js_1.Structures.extend('Message', () => I18nextMessage);
discord_js_1.Structures.extend('TextChannel', () => I18nextTextChannel);
discord_js_1.Structures.extend('DMChannel', () => I18nextDMChannel);
discord_js_1.Structures.extend('NewsChannel', () => I18nextNewsChannel);
discord_js_1.Structures.extend('Guild', () => I18nextGuild);
//# sourceMappingURL=register-discordjs.js.map