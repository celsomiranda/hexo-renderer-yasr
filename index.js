var stylus = require('stylus');
var nib = require('nib');
var axis = require('axis');
var rupture = require('rupture');
var jeet = require('jeet');
var autoprefixer = require('autoprefixer-stylus');

var yasr_renderer = function(data, options, callback){
  var yasr_config = hexo.config.yasr || {};

  stylus(data.text)
    .use(nib())
    .use(axis())
    .use(rupture())
    .use(jeet())
    .use(autoprefixer({ browsers: ['last 2 version'] }))
    .set('filename', data.path)
    .set('sourcemap', options)
    .set('compress', yasr_config.compress)
    .set('include css', true)
    .render(callback);
};

hexo.extend.renderer.register('styl', 'css', yasr_renderer);
hexo.extend.renderer.register('stylus', 'css', yasr_renderer);
