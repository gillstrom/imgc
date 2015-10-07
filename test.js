'use strict';
import {stat} from 'fs';
import test from 'ava';
import imgc from './';

test('Should output jpeg', t => {
	t.plan(2);

	imgc('./fixtures/*.CR2 ./fixtures/*.png', './fixtures/output', {format: 'jpeg', quality: 'medium'}).then(() => {
		stat('./fixtures/output/test_CR2.jpg', err => {
			t.assert(!err, err);
		});

		stat('./fixtures/output/test_PNG.jpg', err => {
			t.assert(!err, err);
		});
	});
});


test('Should output tiff', t => {
	t.plan(3);

	imgc('./fixtures/*.*', './fixtures/output', {format: 'tiff'}).then(() => {
		stat('./fixtures/output/test_CR2.tiff', err => {
			t.assert(!err, err);
		});

		stat('./fixtures/output/test_PNG.tiff', err => {
			t.assert(!err, err);
		});

		stat('./fixtures/output/test_JPG.tiff', err => {
			t.assert(!err, err);
		});
	});
});
