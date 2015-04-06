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
  var opts = (this.config.yasr) ? this.config.yasr : defaults;

  result = (opts.nib || opts.nib === true) ?
    result.use(nib()).import('nib') : result;

  result = (opts.axis || opts.axis === true) ?
    result.use(axis()) : result;

  result = (opts.rupture || opts.rupture === true) ?
    result.use(rupture()) : result;

  result = (opts.jeet || opts.jeet === true) ?
    result.use(jeet()).import('jeet') : result;

  result = (opts.typographic || opts.typographic === true) ?
    result.use(typographic()).import('typographic') : result;

  result = (opts.autoprefixer) ?
    result.use(autoprefixer(opts.autoprefixer)) : result;

  result = result.set('filename', data.path);

  result = (opts.sourcemaps) ?
    result.set('sourcemap', opts.sourcemaps) : result;

  result = (opts.compress || opts.compress === true) ?
    result.set('compress', opts.compress) : result;

  result = result.set('include css', true).render(callback);

  return result;
};
