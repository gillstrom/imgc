'use strict';
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var Promise = require('pinkie-promise');
var pify = require('pify');
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

module.exports = function (files, dest, opts) {
	opts = opts || {};

	if (process.platform !== 'darwin') {
		return Promise.reject(new Error('Only OS X systems are supported'));
	}

	if (typeof files !== 'string') {
		return Promise.reject(new TypeError('Expected a string'));
	}

	if (typeof dest !== 'string') {
		return Promise.reject(new TypeError('Expected a destination'));
	}

	if (!opts.format) {
		return Promise.reject(new Error('Format is required in order to convert'));
	}

	if (formats.indexOf(opts.format) === -1) {
		return Promise.reject(new Error('Format not supported'));
	}

	if (opts.quality && qualities.indexOf(opts.quality) === -1 && typeof Number(opts.quality) !== 'number') {
		return Promise.reject(new Error('Quality not supported'));
	}

	return pify(mkdirp, Promise)(dest).then(function () {
		var cmd = [
			'sips',
			'-s format',
			opts.format,
			opts.quality ? '-s formatOptions ' + opts.quality : '',
			files,
			'--out',
			dest
		].join(' ');

		return pify(exec, Promise)(cmd);
	});
};
