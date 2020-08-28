# Creek

## 技术要点

### 桌面端开发框架

[Electron](https://www.electronjs.org/)

### 动态菜单栏

重新设置 context menu

### 使用 Chrome 插件（例如 vue-devtools）

- 官方文档 https://www.electronjs.org/docs/tutorial/devtools-extension
- 使用第三方库 https://github.com/MarshallOfSound/electron-devtools-installer

### 避免打开窗口时闪屏

官方文档 https://www.electronjs.org/docs/api/browser-window#using-ready-to-show-event

### main 进程和 renderer 进程通讯

1. 使用 ipcMain 和 ipcRenderer API，以及 BrowserWindow.WebContents.send() 方法
2. 使用 global 对象和 require('electron').remote.getGlobal() 方法

### Vue 多页面

使用 Webpack 配置多个入口，官方文档 https://webpack.js.org/concepts/output/#multiple-entry-points

### ⚠️ 使用 webpack-dev-server && 支持 Webpack HRM（Hot Module Replacement）

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
    transition: transform 10s linear; /* 使用 CSS3 Transition 实现弹幕效果 */
}

.msg-start {
    transform: translate3d(400px, 0, 0); /* 标记弹幕开始位置 */
}

.msg-end {
    transform: translate3d(-100%, 0, 0); /* 标记弹幕结束位置 */
}
```

### 获取弹幕数据

为了方便用户自建高性能的弹幕服务，Creek 在 Electron 客户端中获取弹幕数据时采用简单和实用的 HTTP 轮训方案。

约定获取弹幕数据的 HTTP Response 字段格式如下：

```json
[
  {"msg": "How are you"},
  {"msg": "I am fine, thank you, and you"},
  {"msg": "Me too"}
]
```

## 第三方支持