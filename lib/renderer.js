'use strict';
var axis         = require('axis');
var autoprefixer = require('autoprefixer-stylus');
var jeet         = require('jeet');
var nib          = require('nib');
var rupture      = require('rupture');
var stylus       = require('stylus');
var typographic  = require('typographic');

module.exports = function(data, options, callback){

  var result = stylus(data.text);
  var defaults = {
        nib: true,
        axis: true,
        rupture: true,
        jeet: true,
        typographic: true
      };
  var o = (this.config.yasr) ? this.config.yasr : defaults;

  result = (o.nib && o.nib === true) ?
    result.use(nib()).import('nib') : result;

  result = (o.axis && o.axis === true) ?
    result.use(axis()) : result;

  result = (o.rupture && o.rupture === true) ?
    result.use(rupture()) : result;

  result = (o.jeet && o.jeet === true) ?
    result.use(jeet()).import('jeet') : result;

  result = (o.typographic && o.typographic === true) ?
    result.use(typographic()).import('typographic') : result;

  result = (o.autoprefixer) ?
    result.use(autoprefixer(o.autoprefixer)) : result;

  result = result.set('filename', data.path);

  result = (o.sourcemaps) ?
    result.set('sourcemap', o.sourcemaps) : result;

  result = (o.compress && o.compress === true) ?
    result.set('compress', o.compress) : result;

  result = result.set('include css', true).render(callback);

  return result;
};
