"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginMiddleware = void 0;
require("../lib/structures/http/HttpCodes");
const Middleware_1 = require("../lib/structures/Middleware");
class PluginMiddleware extends Middleware_1.Middleware {
    constructor(context) {
        super(context, { position: 20 });
        Object.defineProperty(this, "mediaParsers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.mediaParsers = this.context.server.mediaParsers;
    }
    async run(request, response, route) {
        // RFC 1341 4.
        const contentType = request.headers['content-type'];
        if (typeof contentType !== 'string')
            return;
        // RFC 7230 3.3.2.
        const lengthString = request.headers['content-length'];
        if (typeof lengthString !== 'string')
            return;
        // Verify if the content length is lower than accepted:
        const length = Number(lengthString);
        const maximumLength = route.maximumBodyLength;
        if (length > maximumLength) {
            response.status(413 /* PayloadTooLarge */).json({ error: 'Exceeded maximum content length.' });
            return;
        }
        // Verify if the content type is supported by the parser:
        const type = this.mediaParsers.parseContentType(contentType);
        const parser = this.mediaParsers.get(type);
        if (!parser || !parser.accepts(route)) {
            response.status(415 /* UnsupportedMediaType */).json({ error: `Unsupported type ${type}.` });
            return;
        }
        try {
            // Parse the content body:
            request.body = await parser.run(request);
        }
        catch {
            response.status(400 /* BadRequest */).json({ error: `Cannot parse ${type} data.` });
        }
    }
}
exports.PluginMiddleware = PluginMiddleware;
//# sourceMappingURL=body.js.map