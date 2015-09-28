# jQuery plugin for CORS AJAX request with Internet Explorer 8/9

Transparent jQuery fallback to XDomainRequest object to perform a cross-domain (CORS) AJAX requests with IE8 and IE9

## Usage

Just include in HTML page

```HTML
<!--[if lte IE 9]><script src="https://raw.githubusercontent.com/gfdev/javascript-jquery-transport-xdr/master/dist/jquery.transport.xdr.min.js"></script><![endif]-->
```

and use CORS requests as usual

```JavaScript
// POST request example
$.ajax({
    type: 'POST',
    url: 'http://localhost/json',
    data: { test: 'test'},
    dataType: 'json'
}).done(function(data, status, xhr) {
    console.log(data);
}).fail(function(xhr, status, error) {
    console.log(error);
});

// GET request example
$.getJSON('http://localhost/json').done(function(data, status, xhr) {
    console.log(data);
}).fail(function(xhr, status, error) {
    console.log(error);
});
```
