#!/usr/bin/env node
'use strict';
var meow = require('meow');
var imgc = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ imgc <files> --format <format>',
		'  $ imgc <files> --format <format> --quality <quality>',
		'  $ imgc <files> --format <format> --out <directory>',
		'',
		'Example',
		'  $ imgc *.CR2 --format jpeg --quality high',
		'  $ imgc *.jpg *.png --format tiff --dest ./output/tiff',
		'',
		'Options',
		'  -f, --format <format>      File format of converted files',
		'  -o, --out <directory>      Where to place the files',
		'  -s, --quality <quality>    Quality of converted files',
		'',
		'Formats',
		'  jpeg | tiff | png | gif | jp2 | pict | bmp | qtif | psd | sgi | tga',
		'',
		'Qualities',
		'  low | normal | high | best | <percent>'
	]
}, {
	string: [
		'format',
		'out',
		'quality'
	],
	alias: {
		f: 'format',
		o: 'out',
		q: 'quality'
	},
	default: {
		dest: process.cwd()
	}
});

if (!cli.flags.format) {
	console.error([
		'Format is required in order to convert.',
		'',
		'Formats',
		'  jpeg | tiff | png | gif | jp2 | pict | bmp | qtif | psd | sgi | tga'
	].join('\n'));
	process.exit(1);
}

imgc(cli.input.join(' '), cli.flags.dest, {format: cli.flags.format, quality: cli.flags.quality}, function (err, res) {
	if (err) {
		console.error(err.message.match(/(Error [0-9]: ).+/)[0]);
		process.exit(1);
	}

	console.log('Images was successfully converted');
});
