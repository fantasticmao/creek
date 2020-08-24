# Creek

## 技术要点

### 桌面端开发框架

[Electron](https://www.electronjs.org/)

### 动态菜单栏

### Vue 多页面

使用 Webpack 配置多个入口

### 使用 webpack-dev-server && 支持 Webpack HRM（Hot Module Replacement）

开启 `devServer`，并且设置 `output.publicPath` 为 webpack-dev-server 的 URL 地址

### 弹幕原理

```text
    +--------------danmu-------------+
    |                                |
msg |============ channel ===========｜ <= msg
    |                                |
msg |============ channel ===========｜ <= msg
    |                                |
msg |============ channel ===========｜ <= msg
    |                                |
    +--------------------------------+
```

```css
.danmu {
    width: 400px; /* 容器宽度 */
    height: 300px; /* 容器高度 */

    display: grid; /* 声明多行 Channel 布局 */
    grid-template-columns: repeat(7, 32px); /* 声明 Channel 行数和行高，rows = Math.floor( 300 / ( 32 + 10 )) */
    grid-row-gap: 10px; /* 声明多行 Channel 间隔 */
}

.channel {
    width: 100%;
}

.msg {
    position: absolute;
    font-size: 32px;
    color: #FFFFFF;
    opacity: 0.45;
    margin-right: 16px;
    animation-name: msg; /* 使用 CSS3 Animation 实现弹幕效果 */
    animation-duration: 10s;
    animation-timing-function: linear;
}

@keyframes msg {
    from {
        transform: translate3d(400px, 0, 0); /* 标记弹幕开始位置 */
    }

    to {
        transform: translate3d(-100%, 0, 0); /* 标记弹幕结束位置 */
    }
}
```

### 获取弹幕数据

为了方便用户自建高性能的弹幕服务，Creek 在 Electron 客户端中获取弹幕数据时采用简单和实用的 HTTP 轮训方案。

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