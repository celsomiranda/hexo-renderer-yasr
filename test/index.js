var should = require('chai').should();

describe('Yet Another Stylus Renderer', function(){
  var ctx = {
    config: {
      yasr: {
        axis: false,
        compress: false,
        jeet: false,
        nib: false,
        rupture: false,
        typographic: false,
      }
    }
  };

  var r = require('../lib/renderer').bind(ctx);

  it('Default', function(){
    var body = [
      'table',
      '  for row in 1 2 3 4 5',
      '    tr:nth-child({row})',
      '      height: 10px * row'
    ].join('\n');

    r({text: body}, {}, function(err, result){
      if (err) throw err;

      result.should.eql([
        'table tr:nth-child(1) {',
        '  height: 10px;',
        '}',
        'table tr:nth-child(2) {',
        '  height: 20px;',
        '}',
        'table tr:nth-child(3) {',
        '  height: 30px;',
        '}',
        'table tr:nth-child(4) {',
        '  height: 40px;',
        '}',
        'table tr:nth-child(5) {',
        '  height: 50px;',
        '}'
      ].join('\n') + '\n');
    });
  });

  it('Axis CSS', function(){
    ctx.config.yasr.axis = true;
    var axiss = [
      'code',
      '  code(color = #DF5C33)'
    ].join('\n');

    r({text: axiss}, {}, function(err, result){
      if (err) throw err;

      ctx.config.yasr.axis = false;
      result.should.eql([
        'code {',
        '  padding: 3px 4px;',
        '  color: #df5c33;',
        '  background-color: #f5f5f5;',
        '  border: 1px solid #e1e1e8;',
        '  border-radius: 3px;',
        '  font-family: Menlo, Monaco, \'Bitstream Vera Sans Mono\', Consolas, Courier, monospace;',
        '}'
      ].join('\n') + '\n');
    });
  });

  it('Compress', function(){
    ctx.config.yasr.compress = true;

    var comps = [
      '.test',
      '  color: red'
    ].join('\n');

    r({text: comps}, {}, function(err, result){
      if (err) throw err;

      ctx.config.yasr.compress = false;
      result.should.eql('.test{color:#f00}');
    });
  });

  it('Jeet', function(){
    ctx.config.yasr.jeet = true;
    var jeets = [
      '.test',
      '  center(1024px, 0)'
    ].join('\n');

    r({text: jeets}, {}, function(err, result){
      if (err) throw err;

      ctx.config.yasr.jeet = false;
      result.should.eql([
        '.test {',
        '  *zoom: 1;',
        '  width: auto;',
        '  max-width: 1024px;',
        '  float: none;',
        '  display: block;',
        '  margin-right: auto;',
        '  margin-left: auto;',
        '  padding-left: 0;',
        '  padding-right: 0;',
        '}',
        '.test:before,',
        '.test:after {',
        '  content: \'\';',
        '  display: table;',
        '}',
        '.test:after {',
        '  clear: both;',
        '}'
      ].join('\n') + '\n');
    });
  });

  it('Nib', function(){
    ctx.config.yasr.nib = true;
    var nibs = [
      '.test',
      '  fixed: bottom right;'
    ].join('\n');

    r({text: nibs}, {}, function(err, result){
      if (err) throw err;

      ctx.config.yasr.nib = false;
      result.should.eql([
        '.test {',
        '  position: fixed;',
        '  bottom: 0;',
        '  right: 0;',
        '}'
      ].join('\n') + '\n');
    });
  });

  it('Rupture', function(){
    ctx.config.yasr.rupture = true;
    var rup = [
      '.test',
      '  +above(360px)',
      '    background-color: #fff'
    ].join('\n');

    r({text: rup}, {}, function(err, result){
      if (err) throw err;

      ctx.config.yasr.rupture = false;
      result.should.eql([
        '@media only screen and (min-width: 360px) {',
        '  .test {',
        '    background-color: #fff;',
        '  }',
        '}'
      ].join('\n') + '\n');
    });
  });

  it('Typographic', function(){
    ctx.config.yasr.typographic = true;
    var typs = [
      '.test',
      '  t-html()'
    ].join('\n');

    r({text: typs}, {}, function(err, result){
      if (err) throw err;

      ctx.config.yasr.typographic = false;
      result.should.eql([

        '.test {',
        '  font-family: \'Helvetica Neue\', \'Helvetica\', \'Arial\', \'sans-serif\';',
        '  font-weight: 300;',
        '  color: #666;',
        '  font-size: 12px;',
        '  line-height: 1.75em;',
        '}',
        '@media (min-width: 600px) {',
        '  .test {',
        '    font-size: calc( 12px + (20 - 12) * ((100vw - 600px) / (1000 - 600)) );',
        '  }',
        '}',
        '@media (min-width: 1000px) {',
        '  .test {',
        '    font-size: 20px;',
        '  }',
        '}'
      ].join('\n') + '\n');
    });
  });

  it('Autoprefixer', function(){
    ctx.config.yasr.autoprefixer = { browsers: ['last 2 version','> 5%'] };

    var comps = [
      '.test',
      '  display: flex'
    ].join('\n');

    r({text: comps}, {}, function(err, result){
      if (err) throw err;

      ctx.config.yasr.autoprefixer = null;
      result.should.eql([
        '.test {',
        '  display: -webkit-flex;',
        '  display: -ms-flexbox;',
        '  display: flex;',
        '}'
      ].join('\n') + '\n');
    });
  });

});
