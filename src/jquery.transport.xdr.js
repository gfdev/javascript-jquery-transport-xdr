/*!
 * jQuery.transport.xdr
 * https://github.com/gfdev/javascript-jquery-transport-xdr
 * Copyright (c) 2015 Gordon Freeman
 */
'use strict';

$.ajaxTransport('+*', (opts, optsUser) => {
    if (opts.crossDomain && (document.addEventListener || document.querySelector) && !window.atob && window.XDomainRequest) {
        var text = require('./text'),
            xdr = new XDomainRequest(),
            method = opts.type.toUpperCase(),
            scheme = opts.url.substring(0, opts.url.indexOf(':')).toUpperCase(),
            uri = opts.url,
            data = optsUser.data || {},
            _error = function (code, param) {
                return {
                    send: (hdr, cb) => cb(-1, text.get(code, param)),
                    abort: $.noop
                }
            };

        if (!xdr) return _error(1);
        if (!opts.forceMethod && $.inArray(method, ['GET', 'POST']) === -1) return _error(2, method);
        if ($.inArray(scheme, ['HTTP', 'HTTPS']) === -1) return _error(3, scheme);
        if (scheme !== location.protocol.substring(0, location.protocol.indexOf(':')).toUpperCase()) return _error(4);

        if (optsUser.forceMethod) {
            if (method === 'HEAD') {
                uri += (opts.url.indexOf('?') === -1 ? '?' : '&') + '__method=' + method;
                method = 'GET';
            }

            if ($.inArray(method, ['PUT', 'DELETE', 'PATCH']) !== -1) {
                data.__method = method;
                method = 'POST';
            }
        }

        if (optsUser.forceContentType && optsUser.contentType) {
            if (method === 'GET')
                uri += (opts.url.indexOf('?') === -1 ? '?' : '&') + '__contentType=' + encodeURIComponent(optsUser.contentType);
            if (method === 'POST') data.__contentType = optsUser.contentType;
        }

        if (opts.timeout) xdr.timeout = opts.timeout;

        xdr.onprogress = $.noop;

        return {
            send: (hdr, cb) => {
                xdr.onload = () => {
                    var data = {}, error = null;

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

                    if (error) return cb(500, 'Bad Data: ' + error);

                    var headers = [
                        'Content-Type: ' + xdr.contentType,
                        'Content-Length: ' + xdr.responseText.length
                    ];

                    cb(200, 'success', data, headers.join('\r\n'));
                },
                xdr.onerror = () => cb(500, 'Network Error');
                xdr.ontimeout = () => cb(500, 'Timeout');

                xdr.open(method, uri);

                setTimeout(() => xdr.send(method === 'POST' && !$.isEmptyObject(data) ? $.param(data) : null), 0);
            },
            abort: () => xdr.abort()
        };
    }
});
