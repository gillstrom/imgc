# imgc

> An image converter for OS X systems.


## Install

```
$ npm install --save imgc
```


## Usage

```js
const imgc = require('imgc');

imgc('*.CR2 *.png', 'dest', {format: 'jpeg', quality: 'medium'}.then(() => {
	console.log('Images converted');
});
```


## CLI

```
$ npm install --global imgc
```

```
$ imgc --help

	Usage
	  $ imgc <files> --format <format>
	  $ imgc <files> --format <format> --quality <quality>
	  $ imgc <files> --format <format> --out <directory>

	Example
	  $ imgc *.CR2 --format jpeg --quality high
	  $ imgc *.jpg *.png --format tiff --out ./output/tiff

	Options
	  -f, --format <format>      File format of converted files
	  -o, --out <directory>      Where to place the files
	  -s, --quality <quality>    Quality of converted files

	Formats
	  jpeg | tiff | png | gif | jp2 | pict | bmp | qtif | psd | sgi | tga

	Qualities
	  low | normal | high | best | <percent>
```


## API

### imgc(input, dest, options)

Returns a promise that resolves when images are converted.

#### input

*Required*  
Type: `string`

String of file paths to images.

#### dest

*Required*  
Type: `string`

Destination folder for converted images.

#### options

*Required*  
Type: `object`

##### options.format

*Required*  
Type: `string`

Set the format to convert to, e.g. `jpeg`.

##### options.quality
 
Type: `string`

Set the quality of converted images, e.g. `best`.


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
