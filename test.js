'use strict';
var path = require('path');
var stat = require('fs').stat;
var test = require('ava');
var imgc = require('./');

test('Should output jpeg', function (t) {
	t.plan(3);

	imgc('./test_images/*.CR2 ./test_images/*.png', './test_images/output', {format: 'jpeg', quality: 'medium'}, function (err) {
		t.assert(!err, err);

		stat('./test_images/output/test_CR2.jpg', function (err) {
			t.assert(!err, err);
		});

		stat('./test_images/output/test_PNG.jpg', function (err) {
			t.assert(!err, err);
		});
	});
});

test('Should output tiff', function (t) {
	t.plan(4);

	imgc('./test_images/*.*', './test_images/output', {format: 'tiff'}, function (err) {
		t.assert(!err, err);

		stat('./test_images/output/test_CR2.tiff', function (err) {
			t.assert(!err, err);
		});

		stat('./test_images/output/test_PNG.tiff', function (err) {
			t.assert(!err, err);
		});

		stat('./test_images/output/test_JPG.tiff', function (err) {
			t.assert(!err, err);
		});
	});
});



