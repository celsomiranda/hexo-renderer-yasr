'use strict';
var fs = require('fs');
var render = require('../lib/renderer');
var should = require('chai')
  .should();
var source = readFiles('test.styl');

function readFiles(path) {
  return fs.readFileSync(path.replace(/^/, './test/fixtures/'), 'utf-8')
    .replace(/(\r\n|\r)/gm, '\n');
}

var withoutConfig = readFiles('out/noconfig.css');

describe('YASR', function () {

  it('should revert to default settings if none provided', function () {
    var ctx = {
      config: {}
    };
    var parse = render.bind(ctx);
    var result = parse({
      text: source,
      path: './test/fixtures/test.styl'
    });

    ctx = {};
    result.should.equal(withoutConfig);
  });

  it('should use individual plugins', function () {
    var nib = readFiles('out/nib.css');
    var ctx = { config: { yasr: { nib: true } } };
    var p_nib = render.bind(ctx);
    var r_nib = p_nib({
      text: source,
      path: './test/fixtures/test.styl'
    });
    ctx = { config: { yasr: { nib: false } } };

    var axis = readFiles('out/axis.css');
    ctx = { config: { yasr: { axis: true } } };
    var p_axis = render.bind(ctx);
    var r_axis = p_axis({
      text: source,
      path: './test/fixtures/test.styl'
    });
    ctx = { config: { yasr: { axis: false } } };

    var rupture = readFiles('out/rupture.css');
    ctx = { config: { yasr: { rupture: true } } };
    var p_rupture = render.bind(ctx);
    var r_rupture = p_rupture({
      text: source,
      path: './test/fixtures/test.styl'
    });
    ctx = { config: { yasr: { rupture: false } } };

    var jeet = readFiles('out/jeet.css');
    ctx = { config: { yasr: { jeet: true } } };
    var p_jeet = render.bind(ctx);
    var r_jeet = p_jeet({
      text: source,
      path: './test/fixtures/test.styl'
    });
    ctx = { config: { yasr: { jeet: false } } };

    var typographic = readFiles('out/typographic.css');
    ctx = { config: { yasr: { typographic: true } } };
    var p_typographic = render.bind(ctx);
    var r_typographic = p_typographic({
      text: source,
      path: './test/fixtures/test.styl'
    });
    ctx = { config: { yasr: { typographic: false } } };

    console.log(r_jeet)

    r_nib.should.equal(nib);
    r_axis.should.equal(axis);
    r_rupture.should.equal(rupture);
    r_jeet.should.equal(jeet);
    r_typographic.should.equal(typographic);
  });

  it('should use values from theme config', function () {
    var sourceMaps = readFiles('out/themeconfig.css');
    var themeSource = readFiles('testtheme.styl');
    var ctx = {
      config: {
        header: 'not-this'
      },
      theme: {
        config: {
          header: 'http://loremflickr.com/1600/900/model',
          foo: {
            bar: ['1px', '2px', '3px', '4px']
          }
        }
      }
    };
    var parse = render.bind(ctx);
    var result = parse({
      text: themeSource,
      path: './test/fixtures/testtheme.styl'
    });

    ctx = {};
    result.should.equal(sourceMaps);
  });

  it('should use sourcemaps', function () {
    var sourceMaps = readFiles('out/sourcemaps.css');
    var ctx = {
      config: {
        yasr: {
          sourcemaps: {
            comment: true,
            inline: true,
            sourceRoot: '',
            basePath: 'out/'
          }
        }
      }
    };
    var parse = render.bind(ctx);
    var result = parse({
      text: source,
      path: './test/fixtures/test.styl'
    });

    ctx = {};
    result.should.equal(sourceMaps);
  });

  it('should compress the output files', function () {
    var compressOutput = readFiles('out/compress.css');
    var ctx = {
      config: {
        yasr: {
          compress: true
        }
      }
    };
    var parse = render.bind(ctx);
    var result = parse({
      text: source,
      path: './test/fixtures/test.styl'
    });

    ctx = {};
    result.should.equal(compressOutput);
  });

});
