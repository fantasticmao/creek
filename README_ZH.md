# Creek

## 技术要点

### 桌面端开发框架

[Electron](https://www.electronjs.org/)

### Vue 多页面

使用 Webpack 配置多个入口

### 使用 Vue-Devtools

### 使用 webpack-dev-server

### 获取弹幕数据

考虑到搭建自定义弹幕服务的方便性，采用 HTTP 轮训的方案。约定从 Response 的 data 字段中获取弹幕数据，数据格式如下：

```json
{
  "data": ["Hello, World!"]
}
```

## 第三方支持