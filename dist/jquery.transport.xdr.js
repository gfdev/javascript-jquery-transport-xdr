(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.ajaxTransport('+*', function(opts) {
        if (opts.crossDomain && (document.addEventListener || document.querySelector) && !window.atob && window.XDomainRequest) {
            var xdr = new XDomainRequest(),
                protoDst = opts.url.substring(0, opts.url.indexOf(':')),
                protoSrc = location.protocol;

            if (!xdr)
                return _error('No Transport');
            if ($.inArray(opts.type.toUpperCase(), ['GET', 'POST']) === -1)
                return _error(opts.type + ' Request Not Allowed');
            if ($.inArray(protoDst.toUpperCase(), ['HTTP', 'HTTPS']) === -1)
                return _error(protoDst.toUpperCase() + ' Protocol Not Supported');
            if ((protoSrc.substring(0, protoSrc.indexOf(':') === -1 ? protoSrc.length : protoSrc.indexOf(':'))) !== protoDst)
                return _error('Source and destination URI scheme must be the same');

            if ('timeout' in opts) xdr.timeout = opts.timeout;

            function _error(text) {
                return {
                    send: function(hdr, cb) { cb(-1, text); },
                    abort: $.noop
                }
            }

            return {
                send: function(hdr, cb) {
                    xdr.onload = function() {
                        var content = xdr.responseText,
                            type = xdr.contentType,
                            data = {};

                        if (typeof content !== 'string') return cb(500, 'No Data');

                        switch (opts.dataType) {
                            case 'json':
                                try {
                                    data = _parseJSON(content);
                                } catch (e) {
                                    data.error = e.message;
                                }
                                break;
                            case 'xml':
                                try {
                                    data = _parseXML(content);
                                } catch (e) { console.log(e);
                                    data.error = e.message;
                                }
                                break;
                            case 'text':
                                data.text = content;
                                break;
                            case 'html':
                                data.html = content;
                                break;
                        }

                        if ('error' in data) return cb(500, 'Bad Data: ' + data.error);

                        var headers = [
                            'Content-Type: ' + type,
                            'Content-Length: ' + content.length
                        ];

                        cb(200, 'success', data, headers.join('\r\n'));

                        function _parseJSON(str) {
                            return { json: $.parseJSON(str) };
                        }

                        function _parseXML(str) {
                            var parser, data;

                            if ('DOMParser' in window) {
                                parser = new DOMParser();
                                data = parser.parseFromString(str, 'text/xml');
                            } else {
                                parser = new ActiveXObject('Microsoft.XMLDOM');
                                parser.async = false;

                                if (parser.loadXML(str)) {
                                    data = parser;
                                } else {
                                    return { error: parser.parseError.reason };
                                }
                            }

                            return { xml: data };
                        }
                    },
                    xdr.onerror = function(e) {
                        cb(500, 'Network Error');
                    };
                    xdr.ontimeout = function() {
                        cb(500, 'Timeout');
                    };
                    xdr.onprogress = $.noop;

                    xdr.open(opts.type, opts.url);
                    xdr.send(opts.type.toUpperCase() === 'POST' && opts.hasContent ? opts.data : null);
                },
                abort: function() {
                    xdr.abort();
                }
            };
        }
    });
}));
