'use strict';
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var formats = [
	'jpeg',
	'tiff',
	'png',
	'gif',
	'jp2',
	'pict',
	'bmp',
	'qtif',
	'psd',
	'sgi',
	'tga'
];

var qualities = [
	'low',
	'normal',
	'high',
	'best'
];

module.exports = function (files, dest, opts, cb) {
	opts = opts || {};

	if (process.platform !== 'darwin') {
		throw new Error('Only OS X systems are supported');
	}

	if (typeof files !== 'string') {
		throw new TypeError('Expected a string');
	}

	if (typeof dest !== 'string') {
		throw new TypeError('Expected a destination');
	}

	if (!opts.format) {
		throw new Error('Format is required in order to convert');
	}

	if (formats.indexOf(opts.format) === -1) {
		throw new Error('Format not supported');
	}

	if (opts.quality && qualities.indexOf(opts.quality) === -1 && typeof Number(opts.quality) !== 'number') {
		throw new Error('Quality not supported');
	}

	mkdirp(dest, function (err) {
		if (err) {
			cb(err);
			return;
		}

		var cmd = [
			'sips',
			'-s format',
			opts.format,
			opts.quality ? '-s formatOptions ' + opts.quality : '',
			files,
			'--out',
			dest
		].join(' ');

		exec(cmd, function (err) {
			if (err) {
				cb(err);
				return;
			}

			cb();
		});
	});
};
