(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * jQuery.transport.xdr
	 * https://github.com/gfdev/javascript-jquery-transport-xdr
	 * Copyright (c) 2015 Gordon Freeman
	 */
	'use strict';

	$.ajaxTransport('+*', function (opts, optsUser) {
	    if (opts.crossDomain && (document.addEventListener || document.querySelector) && !window.atob && window.XDomainRequest) {
	        var text = __webpack_require__(1),
	            xdr = new XDomainRequest(),
	            method = opts.type.toUpperCase(),
	            scheme = opts.url.substring(0, opts.url.indexOf(':')).toUpperCase(),
	            uri = opts.url,
	            data = optsUser.data || {},
	            _error = function _error(code, param) {
	            return {
	                send: function send(hdr, cb) {
	                    return cb(-1, text.get(code, param));
	                },
	                abort: $.noop
	            };
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
	            if (method === 'GET') uri += (opts.url.indexOf('?') === -1 ? '?' : '&') + '__contentType=' + encodeURIComponent(optsUser.contentType);
	            if (method === 'POST') data.__contentType = optsUser.contentType;
	        }

	        if (opts.timeout) xdr.timeout = opts.timeout;

	        xdr.onprogress = $.noop;

	        return {
	            send: function send(hdr, cb) {
	                xdr.onload = function () {
	                    var data = {},
	                        error = null;

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

	                    var headers = ['Content-Type: ' + xdr.contentType, 'Content-Length: ' + xdr.responseText.length];

	                    cb(200, 'success', data, headers.join('\r\n'));
	                }, xdr.onerror = function () {
	                    return cb(500, text.get(7));
	                };
	                xdr.ontimeout = function () {
	                    return cb(500, text.get(8));
	                };

	                xdr.open(method, uri);

	                setTimeout(function () {
	                    return xdr.send(method === 'POST' && !$.isEmptyObject(data) ? $.param(data) : null);
	                }, 0);
	            },
	            abort: function abort() {
	                return xdr.abort();
	            }
	        };
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    get: function get(code, param) {
	        var _messages = {
	            0: 'Unknown Error',
	            1: 'No Transport',
	            2: param + ' Method Not Allowed',
	            3: param + ' Scheme Not Supported',
	            4: 'URI source and target scheme must be the same',
	            5: 'No Data',
	            6: 'Bad Data: ' + param,
	            7: 'Network Error',
	            8: 'Timeout'
	        };

	        return _messages[code in _messages ? code : 0];
	    }
	};

/***/ }
/******/ ])
});
;