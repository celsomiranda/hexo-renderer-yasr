'use strict';
var render = require('../lib/renderer');
var should = require('chai').should();


describe('YASR', function () {

  it('reverts to default if no config provided', function () {
    var ctx = {config: {}};
    var parse = render.bind(ctx);
    var result = parse({text: []});

    var expected = [];

    ctx = {};
    result.should.equal(expected);
  });
});
