"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@sapphire/framework");
const Api_1 = require("./lib/Api");
// eslint-disable-next-line @typescript-eslint/unbound-method
framework_1.SapphireClient.plugins.registerPostInitializationHook(Api_1.Api.postInitializationHook);
//# sourceMappingURL=register.js.map