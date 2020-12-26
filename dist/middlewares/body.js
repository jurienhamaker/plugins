"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginMiddleware = void 0;
const url_1 = require("url");
const zlib_1 = require("zlib");
require("../lib/structures/http/HttpCodes");
const Middleware_1 = require("../lib/structures/Middleware");
require("../lib/utils/MimeTypes");
class PluginMiddleware extends Middleware_1.Middleware {
    constructor(context) {
        var _a;
        super(context, { position: 20 });
        Object.defineProperty(this, "maximumBodyLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maximumBodyLength = (_a = this.context.server.options.maximumBodyLength) !== null && _a !== void 0 ? _a : 1024 * 1024 * 50;
    }
    run(request, response, route) {
        var _a;
        const contentType = request.headers['content-type'];
        if (typeof contentType !== 'string')
            return null;
        // RFC 7230 3.3.2.
        const lengthString = request.headers['content-length'];
        if (typeof lengthString !== 'string')
            return null;
        const length = Number(lengthString);
        const maximumLength = (_a = route === null || route === void 0 ? void 0 : route.maximumBodyLength) !== null && _a !== void 0 ? _a : this.maximumBodyLength;
        if (length > maximumLength) {
            response.status(413 /* PayloadTooLarge */).json({ error: 'Exceeded maximum content length.' });
            return null;
        }
        const index = contentType.indexOf(';');
        const type = index === -1 ? contentType : contentType.slice(0, index);
        switch (type) {
            case "application/json" /* ApplicationJson */:
                return this.applicationJson(request, response);
            case "application/x-www-form-urlencoded" /* ApplicationFormUrlEncoded */:
                return this.applicationFormUrlEncoded(request, response);
            case "text/plain" /* TextPlain */:
                return this.textPlain(request);
            default:
                response.status(415 /* UnsupportedMediaType */).json({ error: `Unsupported type ${type}.` });
                return null;
        }
    }
    async textPlain(request) {
        const body = await this.loadStringBody(request);
        request.body = body === '' ? null : '';
    }
    async applicationJson(request, response) {
        const body = await this.loadStringBody(request);
        try {
            request.body = body === '' ? null : JSON.parse(body);
        }
        catch {
            response.status(400 /* BadRequest */).json({ error: 'Cannot parse application JSON data.' });
        }
    }
    async applicationFormUrlEncoded(request, response) {
        const body = await this.loadStringBody(request);
        try {
            request.body = body === '' ? null : Object.fromEntries(new url_1.URLSearchParams(body).entries());
        }
        catch {
            response.status(400 /* BadRequest */).json({ error: 'Cannot parse Form URL-Encoded data.' });
        }
    }
    async loadStringBody(request) {
        const stream = this.contentStream(request);
        if (stream === null)
            return '';
        let body = '';
        for await (const chunk of stream)
            body += chunk;
        return body;
    }
    contentStream(request) {
        var _a;
        switch (((_a = request.headers['content-encoding']) !== null && _a !== void 0 ? _a : 'identity').toLowerCase()) {
            case 'deflate': {
                const stream = zlib_1.createInflate();
                request.pipe(stream);
                return stream;
            }
            case 'gzip': {
                const stream = zlib_1.createGunzip();
                request.pipe(stream);
                return stream;
            }
            case 'identity': {
                return request;
            }
        }
        return null;
    }
}
exports.PluginMiddleware = PluginMiddleware;
//# sourceMappingURL=body.js.map