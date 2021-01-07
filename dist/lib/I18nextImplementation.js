"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nextImplemented = void 0;
/**
 * @since 1.0.0
 * @returns An I18nextImplementation mixin which extends the Base parameter and fully implements {@link I18nextBaseImplementation}.
 * @param Base The class to use as the base for the implementation (e.g. a Discord library's Message object)
 */
function I18nextImplemented(Base) {
    /**
     * The class that defines the base / default implementations of the plugin.
     * This class is used to extend the {@link I18nContext} objects for registers.
     * @since 1.0.0
     **/
    return class I18nextImplementation extends Base {
        /**
         * Accessor for {@link I18nextClient.fetchLanguage} with context applied.
         * To use this in an implementation, create a new function called `fetchLanguage` and execute this with context applied.
         * This can be overwritten if you want to specify a different order of defaulting.
         * @since 1.0.0
         * @see {@link I18nextBaseImplementation.fetchLanguage}
         **/
        async _fetchLanguage(guild, channel, author) {
            var _a, _b, _c, _d;
            const lang = await this.client.fetchLanguage({
                guild,
                channel,
                author
            });
            return (_d = (_a = lang !== null && lang !== void 0 ? lang : guild === null || guild === void 0 ? void 0 : guild.preferredLocale) !== null && _a !== void 0 ? _a : (_c = (_b = this.client.i18n) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.defaultName) !== null && _d !== void 0 ? _d : 'en-US';
        }
        /**
         * Method to be overwritten to apply context to {@link I18nextImplementation._fetchLanguage}
         * @since 1.0.0
         */
        async fetchLanguage() {
            return this._fetchLanguage();
        }
        /**
         * @since 1.0.0
         * @see {@link I18nextBaseImplementation.resolveKey}
         */
        async fetchT() {
            return this.client.i18n.fetchT(await this.fetchLanguage());
        }
        /**
         * @since 1.0.0
         * @see {@link I18nextBaseImplementation.resolveKey}
         */
        async resolveKey(key, ...values) {
            return this.client.i18n.fetchLocale(await this.fetchLanguage(), key, ...values);
        }
    };
}
exports.I18nextImplemented = I18nextImplemented;
//# sourceMappingURL=I18nextImplementation.js.map