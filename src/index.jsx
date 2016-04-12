/*!
 * jquery.transport.xdr
 * https://github.com/gfdev/javascript-jquery-transport-xdr
 * Copyright (c) 2015 Gordon Freeman
 */

import text from './text';

$.ajaxTransport('+*', (opts, optsUser, xhr) => {
    if (opts.crossDomain && (document.addEventListener || document.querySelector) && !window.atob && window.XDomainRequest) {
        let xdr = new XDomainRequest(),
            method = opts.type.toUpperCase(),
            contentType = opts.contentType || optsUser.contentType,
            scheme = opts.url.substring(0, opts.url.indexOf(':')).toUpperCase(),
            uri = opts.url,
            data = optsUser.data || {},
            _error = (code, param) => {
                return {
                    send: (hdr, cb) => { cb(-1, text.get(code, param)); },
                    abort: $.noop
                }
            };

        if (!xdr) return _error(1);
        if (!optsUser.forceMethod && $.inArray(method, ['GET', 'POST']) === -1) return _error(2, method);
        if ($.inArray(scheme, ['HTTP', 'HTTPS']) === -1) return _error(3, scheme);
        if (scheme !== location.protocol.substring(0, location.protocol.indexOf(':')).toUpperCase()) return _error(4);

        if (optsUser.forceMethod) {
            if (method === 'HEAD') {
                method = 'GET';
                uri += (opts.url.indexOf('?') === -1 ? '?' : '&') + '__method=' + method;
            }

            if ($.inArray(method, ['PUT', 'DELETE', 'PATCH']) !== -1) {
                method = 'POST';

                if ($.isPlainObject(data))
                    data.__method = method;
                else if (typeof data === 'string')
                    data += (data.length ? '&' : '') + '__method=' + method;
            }
        }

        if (optsUser.forceContentType) {
            if (method === 'GET')
                uri += (opts.url.indexOf('?') === -1 ? '?' : '&') + '__contentType=' + encodeURIComponent(contentType);

            if (method === 'POST') {
                if ($.isPlainObject(data))
                    data.__contentType = contentType;
                else if (typeof data === 'string')
                    data += (data.length ? '&' : '') + $.param({ __contentType: contentType });
            }
        }

        if (opts.timeout) xdr.timeout = opts.timeout;

        xdr.onprogress = $.noop;

        return {
            send: (hdr, cb) => {
                xdr.onload = () => {
                    let data = {}, error = null;

                    switch (opts.dataType) {
                        case 'json':
                            try {
                                data.json = $.parseJSON(xdr.responseText);
                            } catch (e) {
                                error = e.message;
                            }
                            break;
                        case 'xml':
                            try {
                                data.xml = $.parseXML(xdr.responseText);
                            } catch (e) {
                                error = e.message;
                            }
                            break;
                        case 'text':
                            data.text = xdr.responseText;
                            break;
                        case 'html':
                            data.html = xdr.responseText;
                            break;
                    }

                    if (error) return cb(500, text.get(6, error));

                    let headers = [
                        'Content-Type: ' + xdr.contentType,
                        'Content-Length: ' + xdr.responseText.length
                    ];

                    cb(200, 'OK', data, headers.join('\r\n'));
                };

                xdr.onerror = () => { cb(500, text.get(7)); };
                xdr.ontimeout = () => { cb(500, text.get(8)); };

                if (optsUser.__test === true) {
                    xhr.__method = method;
                    xhr.__uri = uri;
                }

                xdr.open(method, uri);

                setTimeout(() => {
                    xdr.send(method === 'POST'
                        ? typeof data === 'string'
                            ? data
                                : $.isPlainObject(data)
                            ? $.param(data)
                            : null
                        : null);
                }, 0);
            },
            abort: () => { xdr.abort(); }
        };
    }
});
