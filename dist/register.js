"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@sapphire/framework");
const Api_1 = require("./lib/Api");
framework_1.SapphireClient.plugins.registerPostInitializationHook(Api_1.Api[framework_1.postInitialization], 'API-PostInitialization');
framework_1.SapphireClient.plugins.registerPreLoginHook(Api_1.Api[framework_1.preLogin], 'API-PreLogin');
//# sourceMappingURL=register.js.map