'use strict';

var expect = chai.expect;

describe('ERRORS', function() {
    it('restrict method HEAD', function(done) {
        var uri = 'http://baconipsum.com/api/?type=meat-and-filler&format=json',
            rq = $.ajax({
                type: 'HEAD',
                url: uri,
                dataType: 'json'
            });

        rq.fail(function(xhr, status, error) {
            expect(this.crossDomain).true;
            expect(this.hasContent).false;
            expect(this.type).equal('HEAD');
            expect(this.url).equal(uri);

            expect(xhr.status).equal(0);
            expect(status).equal('error');
            expect(error).match(/Method Not Allowed$/i);

            done();
        });
    });

    it('restrict method PUT', function(done) {
        var uri = 'http://baconipsum.com/api/?type=meat-and-filler&format=json',
            rq = $.ajax({
                type: 'PUT',
                url: 'http://baconipsum.com/api/?type=meat-and-filler&format=json',
                dataType: 'json'
            });

        rq.fail(function(xhr, status, error) {
            expect(this.crossDomain).true;
            expect(this.hasContent).true;
            expect(this.type).equal('PUT');
            expect(this.url).equal(uri);

            expect(xhr.status).equal(0);
            expect(status).equal('error');
            expect(error).match(/Method Not Allowed$/i);

            done();
        });
    });

    it('restrict different sheme', function(done) {
        var uri = (
                location.protocol.substring(0, location.protocol.indexOf(':')).toUpperCase() === 'HTTP'
                    ? 'https://baconipsum.com/api/?type=meat-and-filler&format=json'
                    : 'http://baconipsum.com/api/?type=meat-and-filler&format=json'
            ),
            rq = $.ajax({
                type: 'GET',
                url: uri,
                dataType: 'json'
            });

        rq.fail(function(xhr, status, error) {
            expect(this.crossDomain).true;
            expect(this.hasContent).false;
            expect(this.type).equal('GET');
            expect(this.url).equal(uri);

            expect(xhr.status).equal(0);
            expect(status).equal('error');
            expect(error).match(/URI source and target scheme must be the same$/i);

            done();
        });
    });
});

describe('GET', function() {
    it('simple', function(done) {
        var uri = 'http://baconipsum.com/api/?type=meat-and-filler&format=json',
            rq = $.ajax({
                type: 'GET',
                url: uri,
                dataType: 'json'
            });

        rq.done(function(data, status, xhr) {
            expect(this.crossDomain).true;
            expect(this.hasContent).false;
            expect(this.type).equal('GET');
            expect(this.url).equal(uri);

            expect(xhr.status).equal(200);
            expect(xhr.responseJSON).instanceof(Array);

            done();
        });
    });

    it('data', function(done) {
        var uri = 'http://baconipsum.com/api/?type=meat-and-filler&format=json',
            rq = $.ajax({
                type: 'GET',
                url: uri,
                data: { test: 'test', test1: 'test1' },
                dataType: 'json'
            });

        rq.done(function(data, status, xhr) {
            expect(this.crossDomain).true;
            expect(this.hasContent).false;
            expect(this.type).equal('GET');
            expect(this.url).equal(uri + '&test=test&test1=test1');

            expect(xhr.status).equal(200);
            expect(xhr.responseJSON).instanceof(Array);

            done();
        });
    });

    it('forceMethod', function(done) {
        var uri = 'http://baconipsum.com/api/?type=meat-and-filler&format=json',
            rq = $.ajax({
                type: 'HEAD',
                url: uri,
                dataType: 'json',
                forceMethod: true
            });

        rq.done(function(data, status, xhr) {
            expect(this.crossDomain).true;
            expect(this.hasContent).false;
            expect(this.type).equal('GET');
            expect(this.url).equal(uri);

            expect(xhr.status).equal(200);
            expect(xhr.statusText).equal('OK');
            expect(xhr.responseJSON).instanceof(Array);

            done();
        });
    });
});
