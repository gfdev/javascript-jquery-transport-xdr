# jQuery plugin for cross-domain CORS ajax-requests in Internet Explorer 8 and 9

Internet Explorer 8 and 9 versions doesn't support cross-domain **CORS** ajax-requests with **XMLHttpRequest**,
for these purposes IE 8/9 using **XDomainRequest**. `jquery-transport-xdr` makes transparent replasement **jQuery** transport, that's allow cross-domain ajax-requests in IE8 and IE9 without changing source code.

## Limitations

**XDomainRequest** have some limitations:
* server must return **Access-Control-Allow-Origin** header as for usual **CORS** request
* **HTTP** and **HTTPS** only allowed
* **GET** and **POST** only allowed
* custom headers can't be added to request
* there is no **Content-Type** header in request
* **Cookie** can't be sended
* source scheme of URI (**https**://source) must be the same as destination URI scheme (**https**://destination)
* there is no ability to get success response code
* there is no ability to get failure response code

## Installation
1. Add [jquery-transport-xdr](http://cdn.rawgit.com/gfdev/javascript-jquery-transport-xdr/master/dist/jquery.transport.xdr.min.js) to HTML body **after** jQuery:

```html
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<!--[if (IE 8)|(IE 9)]><script src="//cdn.rawgit.com/gfdev/javascript-jquery-transport-xdr/master/dist/jquery.transport.xdr.min.js"></script><![endif]-->
```
or **Bower**:
```
$ bower install jquery-transport-xdr
```
```html
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<!--[if (IE 8)|(IE 9)]><script src="//host/path/bower_modules/dist/jquery.transport.xdr.min.js"></script><![endif]-->
```
or **NPM**:
```
$ npm install jquery-transport-xdr
```
```html
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<!--[if (IE 8)|(IE 9)]><script src="//host/path/node_modules/dist/jquery.transport.xdr.min.js"></script><![endif]-->
```

## Usage examples
After adding [jquery-transport-xdr](http://cdn.rawgit.com/gfdev/javascript-jquery-transport-xdr/master/dist/jquery.transport.xdr.min.js) you can make ajax-requests as usual, without changing code:

`POST:`
```javascript
var xhr = $.ajax({
    type: 'POST',
    url: 'https://baconipsum.com/api/?type=meat-and-filler&format=json',
    dataType: 'json'
});
```

`GET:`
```javascript
var xhr = $.ajax({
    type: 'GET',
    url: 'https://baconipsum.com/api/?type=meat-and-filler&format=json',
    dataType: 'json'
});
```

#### Option **forceMethod**
**XDomainRequest** have limitations, it doesn't allow **PUT**, **DELETE**, **PATCH** and **HEAD** requests, you will receive error **XXX Method Not Allowed** if try to use some of them, but `jquery-transport-xdr` can make replacement:

* **HEAD** => **GET**
* **PUT**|**DELETE**|**PATCH** => **POST**

You should use option **forceMethod**:

`HEAD:`
```javascript
var xhr = $.ajax({
    type: 'HEAD',
    url: 'https://baconipsum.com/api/?type=meat-and-filler&format=json',
    dataType: 'json',
    forceMethod: true
});
```
**HEAD** will be replaced with **GET** in this case and `__method=HEAD` will be added to request params in URI:

`https://baconipsum.com/api/?type=meat-and-filler&format=json`
=>
`https://baconipsum.com/api/?type=meat-and-filler&format=json&__method=HEAD`

Param `__method` you can get on server and deretmine **original** method.

The same way for methods **PUT**, **DELETE** and **PATCH** except for param `__method` will be added to request body and original method will be replaced with **POST**:

`PUT:`
```javascript
var xhr = $.ajax({
    type: 'PUT',
    url: 'https://baconipsum.com/api/?type=meat-and-filler&format=json',
    data: { test: 'test' },
    dataType: 'json',
    forceMethod: true
});
```
`PUT` => `POST`
```
POST /api/?type=meat-and-filler&format=json HTTP/1.1
Host: baconipsum.com
Connection: keep-alive
Content-Length: 0
Pragma: no-cache
Cache-Control: no-cache

test=test&__method=PUT
```

### Option **forceContentType**

**XDomainRequest** limitations doesn't allow to send **Content-Type** header, but you can send it if will add **forceContentType** option:

```javascript
var xhr = $.ajax({
    type: 'POST',
    url: 'https://baconipsum.com/api/?type=meat-and-filler&format=json',
    data: { test: 'test' },
    dataType: 'json',
    forceContentType: true
});
```

**Content-Type** value will be sended in `__contentType` param.

**forceContentType** and **forceMethod** options can be used together:

```javascript
var xhr = $.ajax({
    type: 'PATCH',
    url: 'https://baconipsum.com/api/?type=meat-and-filler&format=json',
    contentType: 'multipart/form-data; charset=UTF-8',
    data: { test: 'test' },
    dataType: 'json',
    forceMethod: true,
    forceContentType: true
});
```

## License
**MIT** license.
