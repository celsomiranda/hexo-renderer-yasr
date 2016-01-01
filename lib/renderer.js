'use strict';
var axis         = require('axis');
var jeet         = require('jeet');
var nib          = require('nib');
var rupture      = require('rupture');
var stylus       = require('stylus');
var typographic  = require('typographic');

function getProperty(obj, name){
  name = name.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');

  var split = name.split('.');
  var key = split.shift();

  if (!obj.hasOwnProperty(key)) return '';

  var result = obj[key];
  var len = split.length;

  if (!len) return result || '';
  if (typeof result !== 'object') return '';

  for (var i = 0; i < len; i++){
    key = split[i];
    if (!result.hasOwnProperty(key)) return '';

    result = result[split[i]];
    if (typeof result !== 'object') return result;
  }

  return result;
}

module.exports = function(data, options, callback){

  var self = this;

  function defineConfig(style){
    style.define('hexo-config', function(data){
      return getProperty(self.theme.config, data.val);
    });
  }

  var defaults = {
        nib: false,
        axis: false,
        rupture: false,
        jeet: false,
        typographic: false
      };
  var o = (this.config.yasr) ? this.config.yasr : defaults;

  var result = stylus(data.text);

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

  result = result.use(defineConfig);

  result = result.set('filename', data.path);

  result = (o.sourcemaps) ?
    result.set('sourcemap', o.sourcemaps) : result;

  result = (o.compress && o.compress === true) ?
    result.set('compress', o.compress) : result;

  result = result.set('include css', true).render(callback);

  return result;
};