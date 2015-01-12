#  Yeat Another Stylus Renderer

A [Stylus] renderer for [Hexo] that uses [Nib], [Axis], [Rupture], [Jeet] and [Autoprefixer].

Although Hexo does come with it's own Stylus renderer &mdash; `hexo-renderer-stylus` &mdash; it only includes Nib support. If you're looking for some extra functionality, `hexo-renderer-yasr` is the stylus renderer you want.

## Installation

Check to see if you have installed `hexo-renderer-stylus` (check inside the `node-modules` directory, but **don't delete it.**). If you have it installed run:
``` bash
$ npm uninstall hexo-renderer-stylus --save
```

After you've removed the default renderer, or if you never installed it in the first place, run:

``` bash
$ npm i hexo-renderer-yasr --save
```

## Configuration

Place the following code inside your `_config.yml`.

``` yaml
#   YASR - Hexo Renderer Configuration
yasr:
  compressed: true
```

### SourceMaps

Nib breaks the SourceMap feature of Stylus, but this will be solved in the future (wainting for the bugfix to ship).

[Stylus]: http://styl.us
[Nib]: http://nib.com
[Axis]: http://axis.cx
[Jeet]: http://jeet.gs
[Autoprefixer]: http://autoprefix.er
[Rupture]: http://rupture.cx
