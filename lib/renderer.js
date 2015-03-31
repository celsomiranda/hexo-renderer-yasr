var axis         = require('axis');
var autoprefixer = require('autoprefixer-stylus');
var jeet         = require('jeet');
var nib          = require('nib');
var rupture      = require('rupture');
var stylus       = require('stylus');
var typographic  = require('typographic');

module.exports = function(data, options, callback){
  var config = this.config.yasr || {};
  var result = stylus(data.text);

  if ( config.nib === true ) {
    result = result.use(nib()).import('nib');
  }

  if ( config.axis === true ) {
    result = result.use(axis());
  }

  if ( config.rupture === true ) {
    result = result.use(rupture());
  }

  if ( config.jeet === true ) {
    result = result.use(jeet()).import('jeet');
  }

  if ( config.typographic === true ) {
    result = result.use(typographic()).import('typographic');
  }

  if ( config.autoprefixer != null ) {
    result = result.use(autoprefixer(config.autoprefixer));
  }

  result = result.set('filename', data.path);

  if ( config.sourcemaps ) {
    result = result.set('sourcemap', config.sourcemaps);
  }

  if ( config.compress != null ) {
    result = result.set('compress', config.compress);
  }

  result = result.set('include css', true).render(callback);

  return result;
};
