# Webpack Configs

## Files Dependency
```text
              webpack.base.js
                 /       \
                /         \
  [webpack.main.js,     webpack.renderer.(dev|prod).js]  ==>  webpack.config.js
```

## Build Commands
```json
{
  "scripts": {
    "build:dev": "cross-env NODE_ENV=development webpack --config build-configs/webpack.config.js",
    "build:prod": "cross-env NODE_ENV=production webpack --config build-configs/webpack.config.js"
  }
}
```