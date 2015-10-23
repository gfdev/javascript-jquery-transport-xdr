'use strict';

var expect = chai.expect;

describe('Array', function() {
    var xhr = $.ajax({
        type: 'GET',
        url: 'http://baconipsum.com/api/?type=meat-and-filler&format=json',
        data: {test: 'test'},
        dataType: 'json'
    });

    it('1', function(done) {
        xhr.done(function() {
            done();
        });
    });
});
