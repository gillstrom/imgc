'use strict';
var stat = require('fs').stat;
var test = require('ava');
var imgc = require('./');

test('Should output jpeg', function (t) {
	t.plan(3);

	imgc('./fixtures/*.CR2 ./fixtures/*.png', './fixtures/output', {format: 'jpeg', quality: 'medium'}, function (err) {
		t.assert(!err, err);

		stat('./fixtures/output/test_CR2.jpg', function (err) {
			t.assert(!err, err);
		});

		stat('./fixtures/output/test_PNG.jpg', function (err) {
			t.assert(!err, err);
		});
	});
});

test('Should output tiff', function (t) {
	t.plan(4);

	imgc('./fixtures/*.*', './fixtures/output', {format: 'tiff'}, function (err) {
		t.assert(!err, err);

		stat('./fixtures/output/test_CR2.tiff', function (err) {
			t.assert(!err, err);
		});

		stat('./fixtures/output/test_PNG.tiff', function (err) {
			t.assert(!err, err);
		});

		stat('./fixtures/output/test_JPG.tiff', function (err) {
			t.assert(!err, err);
		});
	});
});
