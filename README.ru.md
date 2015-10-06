# jQuery плагин для выполнения кросс-доменных **CORS** ajax-запросов в Internet Explorer 8 и 9

Internet Explorer 8 и 9 версии не поддерживают кросс-доменные **CORS** ajax-запросы через стандартный объект **XMLHttpRequest**,
для этих целей в IE 8/9 используется объект **XDomainRequest**. **jquery-transport-xdr** выполняет прозрачную замену транспорта в jQuery, что позволяет, не изменяя исходного кода, разрешить выполнение кросс-доменных ajax-запросов в IE8 и IE9.

## Ограничения
**XDomainRequest** имеет ряд ограничений:
* как и для обычного **CORS** запроса, сервер должен возвращать заголовок **Access-Control-Allow-Origin**
* поддерживаются только протоколы **HTTP** и **HTTPS**
* поддерживаются только методы **GET** и **POST**
* в запрос нельзя добавить свои заголовки
* в запросе отсутствует заголовок **Content-Type**
* в запросе нельзя отправить **Cookie**
* сетевой протокол URI с которого отправляется запрос (**https**://source), должен совпадать с протоколом URI сервера куда идет запрос (**https**://destination)
* нет возможности получить код успешного ответа сервера
* нет возможности получить код неудачного ответа сервера

## Установка
1. Добавить [jquery-transport-xdr](http://cdn.rawgit.com/gfdev/javascript-jquery-transport-xdr/master/dist/jquery.transport.xdr.min.js) в тело **HTML** страницы **после** загрузки **jQuery**:
```html
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<!--[if (IE 8)|(IE 9)]><script src="//cdn.rawgit.com/gfdev/javascript-jquery-transport-xdr/master/dist/jquery.transport.xdr.min.js"></script><![endif]-->
```
**Bower**:
```
$ bower install jquery-transport-xdr
```
```html
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<!--[if (IE 8)|(IE 9)]><script src="//host/path/bower_modules/dist/jquery.transport.xdr.min.js"></script><![endif]-->
```
**NPM**:
```
$ npm install jquery-transport-xdr
```
```html
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<!--[if (IE 8)|(IE 9)]><script src="//host/path/node_modules/dist/jquery.transport.xdr.min.js"></script><![endif]-->
```

## Использование
После добавления [jquery-transport-xdr](http://cdn.rawgit.com/gfdev/javascript-jquery-transport-xdr/master/dist/jquery.transport.xdr.min.js), ajax-запросы используются как обычно, без каких либо изменений:

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

#### Опция `forceMethod`
Т.к. `XDomainRequest` имеет ограничения, нет возможности отправить `PUT`, `DELETE`, `PATCH` или `HEAD` запросы, в случае их использования будет выданна ошибка `XXX Method Not Allowed`, но `jquery-transport-xdr` позволяет использовать преобразование:

* `HEAD` => `GET`
* `PUT`|`DELETE`|`PATCH` => `POST`

Для этого надо использовать параметр `forceMethod` в опциях запроса:

`HEAD:`
```javascript
var xhr = $.ajax({
    type: 'HEAD',
    url: 'https://baconipsum.com/api/?type=meat-and-filler&format=json',
    dataType: 'json',
    forceMethod: true
});
```
В этом случае метод `HEAD` будет заменен на `GET` и к параметрам запроса будет добавлен параметр `__method=HEAD`, т.е. к `URI` будет добавлен дополнительный параметр:

`https://baconipsum.com/api/?type=meat-and-filler&format=json` => `https://baconipsum.com/api/?type=meat-and-filler&format=json&__method=HEAD`

Парамерт `__method` можно получить на сервере и определить **оригинальный** метод.

Тоже будет сделанно для методов `PUT`, `DELETE` и `PATCH`, за исключение того, что параметр `__method` будет добавлен в тело запроса и сам метод будет заменен на `POST`:

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

### Опция `forceContentType`
Из-за ограничений `XDomainRequest` не отправляет заголовок `Content-Type`, передать его можно с помощью опции `forceContentType`:
```javascript
var xhr = $.ajax({
    type: 'POST',
    url: 'https://baconipsum.com/api/?type=meat-and-filler&format=json',
    data: { test: 'test' },
    dataType: 'json',
    forceContentType: true
});
```
Значение `Content-Type` будет переданно в параметре `__contentType`.

Опции `forceContentType` и `forceMethod` можно использовать вместе:

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

## Лицензия
**jquery-transport-xdr** распространяется под лицензией **MIT**.
