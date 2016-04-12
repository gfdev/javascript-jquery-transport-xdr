(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jQuery")) : factory(root["jQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /*!
	                                                                                                                                                                                                                                                   * jquery.transport.xdr
	                                                                                                                                                                                                                                                   * https://github.com/gfdev/javascript-jquery-transport-xdr
	                                                                                                                                                                                                                                                   * Copyright (c) 2015 Gordon Freeman
	                                                                                                                                                                                                                                                   */

	var _text = __webpack_require__(3);

	var _text2 = _interopRequireDefault(_text);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$.ajaxTransport('+*', function (opts, optsUser, xhr) {
	    if (opts.crossDomain && (document.addEventListener || document.querySelector) && !window.atob && window.XDomainRequest) {
	        var _ret = function () {
	            var xdr = new XDomainRequest(),
	                method = opts.type.toUpperCase(),
	                contentType = opts.contentType || optsUser.contentType,
	                scheme = opts.url.substring(0, opts.url.indexOf(':')).toUpperCase(),
	                uri = opts.url,
	                data = optsUser.data || {},
	                _error = function _error(code, param) {
	                return {
	                    send: function send(hdr, cb) {
	                        cb(-1, _text2.default.get(code, param));
	                    },
	                    abort: $.noop
	                };
	            };

	            if (!xdr) return {
	                    v: _error(1)
	                };
	            if (!optsUser.forceMethod && $.inArray(method, ['GET', 'POST']) === -1) return {
	                    v: _error(2, method)
	                };
	            if ($.inArray(scheme, ['HTTP', 'HTTPS']) === -1) return {
	                    v: _error(3, scheme)
	                };
	            if (scheme !== location.protocol.substring(0, location.protocol.indexOf(':')).toUpperCase()) return {
	                    v: _error(4)
	                };

	            if (optsUser.forceMethod) {
	                if (method === 'HEAD') {
	                    method = 'GET';
	                    uri += (opts.url.indexOf('?') === -1 ? '?' : '&') + '__method=' + method;
	                }

	                if ($.inArray(method, ['PUT', 'DELETE', 'PATCH']) !== -1) {
	                    method = 'POST';

	                    if ($.isPlainObject(data)) data.__method = method;else if (typeof data === 'string') data += (data.length ? '&' : '') + '__method=' + method;
	                }
	            }

	            if (optsUser.forceContentType) {
	                if (method === 'GET') uri += (opts.url.indexOf('?') === -1 ? '?' : '&') + '__contentType=' + encodeURIComponent(contentType);

	                if (method === 'POST') {
	                    if ($.isPlainObject(data)) data.__contentType = contentType;else if (typeof data === 'string') data += (data.length ? '&' : '') + $.param({ __contentType: contentType });
	                }
	            }

	            if (opts.timeout) xdr.timeout = opts.timeout;

	            xdr.onprogress = $.noop;

	            return {
	                v: {
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

	                            if (error) return cb(500, _text2.default.get(6, error));

	                            var headers = ['Content-Type: ' + xdr.contentType, 'Content-Length: ' + xdr.responseText.length];

	                            cb(200, 'OK', data, headers.join('\r\n'));
	                        };

	                        xdr.onerror = function () {
	                            cb(500, _text2.default.get(7));
	                        };
	                        xdr.ontimeout = function () {
	                            cb(500, _text2.default.get(8));
	                        };

	                        if (optsUser.__test === true) {
	                            xhr.__method = method;
	                            xhr.__uri = uri;
	                        }

	                        xdr.open(method, uri);

	                        setTimeout(function () {
	                            xdr.send(method === 'POST' ? typeof data === 'string' ? data : $.isPlainObject(data) ? $.param(data) : null : null);
	                        }, 0);
	                    },
	                    abort: function abort() {
	                        xdr.abort();
	                    }
	                }
	            };
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
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