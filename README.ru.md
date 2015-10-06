# jQuery плагин для выполнения кросс-доменных `CORS` ajax запросов в Internet Explorer 8 и 9

Internet Explorer 8 и 9 версии не поддерживают кросс-доменные `CORS` ajax запросы через стандартный объект `XMLHttpRequest`,
для этих целей в IE 8/9 используется объект `XDomainRequest`. Этот плагин выполняет прозрачную замену транспорта в jQuery,
что позволяет, не изменяя исходного кода, разрешить выполнение ajax запросов в IE8 и IE9.

## Ограничения

`XDomainRequest` имеет ряд ограничений:
* поддерживаются только протоколы `HTTP` и `HTTPS`
* поддерживаются только методы `GET` и `POST`
* в запрос нельзя добавить свои заголовки
* в запросе отсутствует заголовок `Content-Type`
* в запросе нельзя отправить `Cookie`
* протокол `URI` с которого отправляется запрос **https**://www.source.com, должен совпадать с протоколом `URI` сервера куда идет запрос **https**://www.destination.com
* нет возможности получить код успешного ответа сервера
* нет возможности получить код неудачного ответа сервера

## Использование

1. Добавить скрипт в тело `HTML` страницы **после** загрузки jquery:
```html
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<!--[if (IE 8)|(IE 9)]><script src="//cdn.rawgit.com/gfdev/javascript-jquery-transport-xdr/master/dist/jquery.transport.xdr.min.js"></script><![endif]-->
```

или с помощью **Bower**
```
bower install jquery-transport-xdr
```

```html
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<!--[if (IE 8)|(IE 9)]><script src="//host/path/bower_modules/jquery.transport.xdr.min.js"></script><![endif]-->
```

или с помощью **NPM**
```
npm install jquery-transport-xdr
```
```html
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<!--[if (IE 8)|(IE 9)]><script src="//host/path/node_modules/jquery.transport.xdr.min.js"></script><![endif]-->
```
