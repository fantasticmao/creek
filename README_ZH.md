# Creek

## 技术要点

### 桌面端开发框架

[Electron](https://www.electronjs.org/)

### 动态菜单栏

### Vue 多页面

使用 Webpack 配置多个入口

### 使用 Vue-Devtools

### 使用 webpack-dev-server && 支持 Webpack HRM（Hot Module Replacement）

开启 `devServer`，并且设置 `output.publicPath` 为 webpack-dev-server 的 URL 地址

### 获取弹幕数据

为了方便用户自建高性能的弹幕服务，Creek 在 Electron 客户端中获取弹幕数据时采用 HTTP 轮训的方案。

约定获取弹幕数据的 HTTP Response 字段格式如下：

```json
[
  {"msg": "Hello"},
  {"msg": "World"}
]
```

## 第三方支持

## TODO

- 配置界面
    - 弹幕：选择设备（显示器）、字体大小、字体颜色，停留时间
    - 服务：本地服务（选择端口）、远程服务（URL）
    - 关于：介绍文案
- 介绍界面