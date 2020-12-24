"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerStyleBackground = exports.LoggerStyleText = exports.LoggerStyleEffect = exports.LoggerStyle = void 0;
const Colorette = __importStar(require("colorette"));
/**
 * Logger utility that applies a style to a string.
 * @since 1.0.0
 */
class LoggerStyle {
    constructor(resolvable = {}) {
        Object.defineProperty(this, "style", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (typeof resolvable === 'function') {
            this.style = resolvable;
        }
        else {
            const styles = [];
            if (resolvable.effects)
                styles.push(...resolvable.effects.map((text) => Colorette[text]));
            if (resolvable.text)
                styles.push(Colorette[resolvable.text]);
            if (resolvable.background)
                styles.push(Colorette[resolvable.background]);
            this.style = styles.length
                ? styles.length === 1
                    ? styles[0]
                    : (string) => styles.reduce((out, style) => style(out), string)
                : Colorette.reset;
        }
    }
    /**
     * Applies the style to a string.
     * @since 1.0.0
     * @param string The value to apply the style to.
     */
    run(string) {
        return this.style(string);
    }
}
exports.LoggerStyle = LoggerStyle;
/**
 * The text styles.
 * @since 1.0.0
 */
var LoggerStyleEffect;
(function (LoggerStyleEffect) {
    LoggerStyleEffect["Reset"] = "reset";
    LoggerStyleEffect["Bold"] = "bold";
    LoggerStyleEffect["Dim"] = "dim";
    LoggerStyleEffect["Italic"] = "italic";
    LoggerStyleEffect["Underline"] = "underline";
    LoggerStyleEffect["Inverse"] = "inverse";
    LoggerStyleEffect["Hidden"] = "hidden";
    LoggerStyleEffect["Strikethrough"] = "strikethrough";
})(LoggerStyleEffect = exports.LoggerStyleEffect || (exports.LoggerStyleEffect = {}));
/**
 * The text colors.
 * @since 1.0.0
 */
var LoggerStyleText;
(function (LoggerStyleText) {
    LoggerStyleText["Black"] = "black";
    LoggerStyleText["Red"] = "red";
    LoggerStyleText["Green"] = "green";
    LoggerStyleText["Yellow"] = "yellow";
    LoggerStyleText["Blue"] = "blue";
    LoggerStyleText["Magenta"] = "magenta";
    LoggerStyleText["Cyan"] = "cyan";
    LoggerStyleText["White"] = "white";
    LoggerStyleText["Gray"] = "gray";
    LoggerStyleText["BlackBright"] = "blackBright";
    LoggerStyleText["RedBright"] = "redBright";
    LoggerStyleText["GreenBright"] = "greenBright";
    LoggerStyleText["YellowBright"] = "yellowBright";
    LoggerStyleText["BlueBright"] = "blueBright";
    LoggerStyleText["MagentaBright"] = "magentaBright";
    LoggerStyleText["CyanBright"] = "cyanBright";
    LoggerStyleText["WhiteBright"] = "whiteBright";
})(LoggerStyleText = exports.LoggerStyleText || (exports.LoggerStyleText = {}));
/**
 * The background colors.
 * @since 1.0.0
 */
var LoggerStyleBackground;
(function (LoggerStyleBackground) {
    LoggerStyleBackground["Black"] = "bgBlack";
    LoggerStyleBackground["Red"] = "bgRed";
    LoggerStyleBackground["Green"] = "bgGreen";
    LoggerStyleBackground["Yellow"] = "bgYellow";
    LoggerStyleBackground["Blue"] = "bgBlue";
    LoggerStyleBackground["Magenta"] = "bgMagenta";
    LoggerStyleBackground["Cyan"] = "bgCyan";
    LoggerStyleBackground["White"] = "bgWhite";
    LoggerStyleBackground["BlackBright"] = "bgBlackBright";
    LoggerStyleBackground["RedBright"] = "bgRedBright";
    LoggerStyleBackground["GreenBright"] = "bgGreenBright";
    LoggerStyleBackground["YellowBright"] = "bgYellowBright";
    LoggerStyleBackground["BlueBright"] = "bgBlueBright";
    LoggerStyleBackground["MagentaBright"] = "bgMagentaBright";
    LoggerStyleBackground["CyanBright"] = "bgCyanBright";
    LoggerStyleBackground["WhiteBright"] = "bgWhiteBright";
})(LoggerStyleBackground = exports.LoggerStyleBackground || (exports.LoggerStyleBackground = {}));
//# sourceMappingURL=LoggerStyle.js.map