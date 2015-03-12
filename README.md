#  Yeat Another Stylus Renderer

A [Stylus] renderer for [Hexo] that uses [Nib], [Axis], [Rupture], [Jeet] and [Autoprefixer].

#### Now with `sourcemaps`

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
  compress: false
  sourcemaps:
    comment: true
    inline: true
    sourceRoot: ''
    basePath: .
  autoprefixer:
    browsers:
      - last 2 version
```

- **Stylus**:
  - **compress** - Compress generated CSS (default: `false`)


- **Sourcemaps**
  - **comment** - Adds a comment with the `sourceMappingURL` to the generated CSS (default: `true`)
  - **inline** - Inlines the sourcemap with full source text in base64 format (default: `false`)
  - **sourceRoot** - `sourceRoot` property of the generated sourcemap
  - **basePath** - Base path from which sourcemap and all sources are relative (default: `.`)


- **Autoprefixer**
  - **browsers** - An array that defines which browsers should be considered by autoprefixer


[Hexo]: http://hexo.io/
[Stylus]: http://styl.us
[Nib]: http://nib.com
[Axis]: http://axis.cx
[Jeet]: http://jeet.gs
[Autoprefixer]: http://autoprefix.er
[Rupture]: http://rupture.cx
