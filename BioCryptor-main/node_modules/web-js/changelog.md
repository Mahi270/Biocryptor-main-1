# Change Log

#### 0.3.1 - 2014/03/06

- Turned the package into an express app/middleware.
- Added cli executable `webjs` for starting web.js servers from the command line when the package is installed globally.
- Added gzip compression.
- Added `ETag` and `Last-Modified` caching support.
- Added an extremely basic url rewriter.
- Added an express middleware loader.
- Fixed `$resolvePath()` so it actually returns a path.
- Added the function `$url()` to global sandbox context.
- Removed `$conf` from global context.