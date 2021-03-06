#  Yet Another Stylus Renderer

[![Build Status](https://travis-ci.org/celsomiranda/hexo-renderer-yasr.svg?branch=master)](https://travis-ci.org/celsomiranda/hexo-renderer-yasr)
[![npm version](https://badge.fury.io/js/hexo-renderer-yasr.svg)](http://badge.fury.io/js/hexo-renderer-yasr)
[![npm dependencies](https://david-dm.org/celsomiranda/hexo-renderer-yasr.svg)](https://www.npmjs.com/package/hexo-renderer-yasr)
[![Coverage Status](https://coveralls.io/repos/celsomiranda/hexo-renderer-yasr/badge.svg?branch=master)](https://coveralls.io/r/celsomiranda/hexo-renderer-yasr?branch=master)


A [Stylus] renderer for [Hexo] that uses [Nib], [Axis], [Rupture], [Jeet], and [Typographic]. It used to have [Autoprefixer] but it got deprecated, so I had to let it go. For now.

Please use Hexo version 3.0.0 or above. This doesn't support 2.x.x and never will.

## Features
#### Integrated libraries
Some libraries ask you to place `@import [library]` in your `.styl` file. YASR takes care of this for you. To use a library you just have to enable it in the `_config.yml` and start using it.

#### Source Maps
YASR can output sourcemaps to your CSS files. This is provided by Stylus, so if you encounter any bugs, let the Stylus developers know.

**Warning: Some libraries can cause problems with sourcemaps.**

#### Load properties from the theme configuration
The render is now able to fetch properties that are defined inside the theme configuration file and place them in your CSS.

I got the code from the original `hexo-renderer-stylus`.

Theme's `_config.yml`:
``` yaml
img: 'http://loremflickr.com/800/600/'

```

Stylus:
``` stylus
.class
  background-image hexo-config('img')
```

Resulting CSS:
``` css
.class {
  background-image: 'http://loremflickr.com/800/600/';
}
```

#### Compression
We use Stylus built in compression flag to minify the outputted CSS files.

## Installation

Check to see if you have installed `hexo-renderer-stylus` (check inside the `node-modules` directory, but **don't delete it.**). If you have it installed run:

``` sh
npm un hexo-renderer-stylus --save
```

After you've removed the default renderer, or if you never installed it in the first place, run:

``` sh
npm i hexo-renderer-yasr --save
```

## Configuration

Place the following code inside your `_config.yml`.

``` yaml
# YASR Configuration
## Docs: https://github.com/celsomiranda/hexo-renderer-yasr
yasr:
  axis: true              # Enables Axis (Recommends Nib)
  compress: false         # Disables Compression
  jeet: true              # Enables Jeet
  nib: true               # Enables Nib
  rupture: true           # Enables Rupture
  typographic: true       # Enables Typographic
  sourcemaps:             # Sourcemaps configuration
    comment: true
    inline: true
    sourceRoot: ''
    basePath: 'css/'
```

- **Sourcemaps**
  - **comment** - Adds a comment with the `sourceMappingURL` to the generated CSS (default: `true`)
  - **inline** - Inlines the sourcemap with full source text in base64 format (default: `false`)
  - **sourceRoot** - `sourceRoot` property of the generated sourcemap
  - **basePath** - Base path from which sourcemap and all sources are relative (default: `.`)


[Hexo]: http://hexo.io/
[Stylus]: http://styl.us
[Nib]: http://nib.com
[Axis]: http://axis.cx
[Jeet]: http://jeet.gs
[Autoprefixer]: http://autoprefix.er
[Rupture]: http://rupture.cx
[Typographic]: http://corysimmons.github.io/typographic/
