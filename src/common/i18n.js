import logger from '../main/logger';
import {getIpAddress} from '../common/system';

const ip = getIpAddress()[0];

class CreekTrayWords {
  stateOn;
  stateOff;
  turnOn;
  turnOff;
  checkForUpdates;
  preferences;
  help;
  help_Question1;
  help_Answer1;
  help_Question2;
  help_Answer2;
  help_MoreQuestions;
  about;
  quite;

  constructor(options) {
    this.stateOn = options.stateOn;
    this.stateOff = options.stateOff;
    this.turnOn = options.turnOn;
    this.turnOff = options.turnOff;
    this.checkForUpdates = options.checkForUpdates;
    this.preferences = options.preferences;
    this.help = options.help;
    this.help_Question1 = options.help_Question1;
    this.help_Answer1 = options.help_Answer1;
    this.help_Question2 = options.help_Question2;
    this.help_Answer2 = options.help_Answer2;
    this.help_MoreQuestions = options.help_MoreQuestions;
    this.about = options.about;
    this.quite = options.quite;
  }
}

class CreekPreferencesWords {
  title;
  display;
  server;
  about;
  fontSize;
  fontColor;
  fontOpacity;
  scrollSpeed;
  scrollSpeed_Slow;
  scrollSpeed_Default;
  scrollSpeed_Fast;
  displayForOutput;
  preview;
  preview_Message;
  preview_TurnOn;
  preview_Cancel;
  previewData;
  enableLocalServer;
  localServerPort;
  remoteServerURL;
  currentVersion;

  constructor(options) {
    this.title = options.title;
    this.display = options.display;
    this.server = options.server;
    this.about = options.about;
    this.fontSize = options.fontSize;
    this.fontColor = options.fontColor;
    this.fontOpacity = options.fontOpacity;
    this.scrollSpeed = options.scrollSpeed;
    this.scrollSpeed_Slow = options.scrollSpeed_Slow;
    this.scrollSpeed_Default = options.scrollSpeed_Default;
    this.scrollSpeed_Fast = options.scrollSpeed_Fast;
    this.displayForOutput = options.displayForOutput;
    this.preview = options.preview;
    this.preview_Message = options.preview_Message;
    this.preview_TurnOn = options.preview_TurnOn;
    this.preview_Cancel = options.preview_Cancel;
    this.previewData = options.previewData;
    this.enableLocalServer = options.enableLocalServer;
    this.localServerPort = options.localServerPort;
    this.remoteServerURL = options.remoteServerURL;
    this.currentVersion = options.currentVersion;
  }
}

const MODULE_TRAY = 'tray';
const MODULE_PREFERENCES = 'preferences';

const allLanguages = {
  'en': {
    'tray': new CreekTrayWords({
      stateOn: 'Creek: On',
      stateOff: 'Creek: Off',
      turnOn: 'Turn Creek On',
      turnOff: 'Turn Creek Off',
      checkForUpdates: 'Check for Updates...',
      preferences: 'Preferences...',
      help: 'Help',
      help_Question1: 'How to send a danmu message',
      help_Answer1: `Creek has internally implemented a simple danmu service in the Local Area Network, which supports accepting and saving danmu data. If you don't want to troublesome a self-built danmu service, you can select "Enable local service" in "Preferences" -> "Services" to support users to send danmu in the Local Area Network.

In the "Enable Local Service" mode, users can send danmu messages by accessing the interface http://${ip}:#{port}/?msg=\${msg}. However, it should be noted that the local service can only work well within the Local Area Network (LAN). If users need to send danmu messages through the Wide Area Network (WAN), you need to build a danmu service by yourself that can be accessed in the WAN.

In the "Disable local service" mode, that is, when using the remote self-built danmu service, the user needs to push the danmu data in accordance with the specifications of the self-built service.`,
      help_Question2: 'How to self-build the danmu service',
      help_Answer2: `Sending danmu messages by users and getting danmu messages by Creek is a typical scenario of "(multi) producer-(single) consumer" mode. Considering the simplicity of the self-built danmu service, it is a convention to use HTTP/HTTPS protocol in the communication process of "User - Danmu Service - Creek" instead of other protocols such as WebSocket or customized based on TCP.

First, the self-built danmu service needs to provide an interface for pushing danmu messages. Normally, this interface should use POST method, but considering simplicity in scenarios such as Webhook, using GET method is also acceptable. This interface is provided for users, it can be packaged into a nice HTML page or a more convenient IM robot.

Second, the self-built danmu service needs to provide an interface for obtaining danmu messages. Creek obtains the danmu data using the HTTP rotation training scheme based on the "pull mode", and the rotation interval is 1 second. You need to ensure that the danmu messages will not be lost or be duplicate consumed, and you need to configure the URL address of this interface in "Preferences" -> "Services" -> "Remote Service URL".`,
      help_MoreQuestions: 'More information...',
      about: 'About',
      quite: 'Quite'
    }),
    'preferences': new CreekPreferencesWords({
      title: 'Preferences',
      display: 'Display',
      server: 'Server',
      about: 'About',
      fontSize: 'Font Size',
      fontColor: 'Font Color',
      fontOpacity: 'Font Opacity',
      scrollSpeed: 'Scroll Speed',
      scrollSpeed_Slow: 'Slow',
      scrollSpeed_Default: 'Default',
      scrollSpeed_Fast: 'Fast',
      displayForOutput: 'Display for Output',
      preview: 'Preview',
      preview_Message: 'Preview changes need to Turn Creek On.',
      preview_TurnOn: 'Turn On',
      preview_Cancel: 'Cancel',
      previewData: [
        "Hiding from the rain and snow",
        "Trying to forget but I won't let go",
        "Looking at a crowded street",
        "Listening to my own heart beat",
        "So many people all around the world",
        "Tell me where do I find someone like you girl",
        "Take me to your heart take me to your soul",
        "Give me your hand before I'm old",
        "Show me what love is - haven't got a clue",
        "Show me that wonders can be true",
        "They say nothing lasts forever",
        "We're only here today",
        "Love is now or never",
        "Bring me far away",
        "Take me to your heart take me to your soul",
        "Give me your hand and hold me",
        "Show me what love is - be my guiding star",
        "It's easy take me to your heart",
        "Standing on a mountain high",
        "Looking at the moon through a clear blue sky",
        "I should go and see some friends",
        "But they don't really comprehend",
        "Don't need too much talking without saying anything",
        "All I need is someone who makes me wanna sing",
        "Take me to your heart take me to your soul",
        "Give me your hand before I'm old",
        "Show me what love is - haven't got a clue",
        "Show me that wonders can be true",
        "They say nothing lasts forever",
        "We're only here today",
        "Love is now or never",
        "Bring me far away",
        "Take me to your heart take me to your soul",
        "Give me your hand and hold me",
        "Show me what love is - be my guiding star",
        "It's easy take me to your heart",
        "Take me to your heart take me to your soul",
        "Give me your hand and hold me",
        "Show me what love is - be my guiding star",
        "It's easy take me to your heart"
      ],
      enableLocalServer: 'Enable Local Server',
      localServerPort: 'Local Server Port',
      remoteServerURL: 'Remote Server URL',
      currentVersion: 'Current version',
    })
  },
  'zh-CN': {
    'tray': new CreekTrayWords({
      stateOn: 'Creek: On',
      stateOff: 'Creek: Off',
      turnOn: '打开 Creek',
      turnOff: '关闭 Creek',
      checkForUpdates: '检查更新...',
      preferences: '偏好设置...',
      help: '帮助',
      help_Question1: '如何发送一条弹幕消息',
      help_Answer1: `Creek 内部实现了一个基于局域网的简易弹幕服务，支持弹幕数据的接收和存储。当您不希望大费周章地自建弹幕服务时，可以在「偏好设置」->「服务」中勾选「启用本地服务」，即可支持用户在局域网内发送弹幕。

在「启用本地服务」模式下，用户通过访问 http://${ip}:#{port}/?msg=\${msg} 接口，便可发送弹幕消息。但需要注意，本地服务只能在局域网（LAN）内正常工作，如果用户需要通过广域网（WAN）来发送弹幕消息，则需要您自行搭建可在广域网中访问的弹幕服务。

当「禁用本地服务」模式下，即使用远程的自建弹幕服务时，用户需要按照自建服务的规范来推送弹幕数据。`,
      help_Question2: '如何自建弹幕服务',
      help_Answer2: `用户发送弹幕消息和 Creek 获取弹幕消息是一个典型的「（多）生产者 - （单）消费者」模式的场景。考虑到自建弹幕服务的简单性，约定在「用户 - 弹幕服务 - Creek」通讯过程中均使用 HTTP/HTTPS 协议，而不是其它诸如 WebSocket 或者基于 TCP 定制的协议。

首先，自建弹幕服务需要提供一个推送弹幕消息的接口。规范地来说，这个接口需要使用 POST 方法，但是考虑到在 Webhook 等场景下的简单性，使用 GET 方法也是可行的。这个接口是为用户提供的，它可以被包装成一个好看的 HTML 页面或者是更加方便的 IM 机器人。

其次，自建弹幕服务需要提供一个获取弹幕消息的接口。Creek 在获取弹幕数据时，采用基于「拉模式」的 HTTP 轮训方案，轮训间隔时间是 1 秒。您需要保证弹幕消息不会被丢失和被重复消费，并且需要在「偏好设置」->「服务」->「远程服务 URL」中配置这个接口的 URL 地址。`,
      help_MoreQuestions: '更多信息...',
      about: '关于',
      quite: '退出'
    }),
    'preferences': new CreekPreferencesWords({
      title: '偏好设置',
      display: '显示',
      server: '服务',
      about: '关于',
      fontSize: '字体大小',
      fontColor: '字体颜色',
      fontOpacity: '不透明度',
      scrollSpeed: '滚动速度',
      scrollSpeed_Slow: '慢',
      scrollSpeed_Default: '默认',
      scrollSpeed_Fast: '快',
      displayForOutput: '显示设备',
      preview: '预览',
      preview_Message: '预览配置更改时，请先打开 Creek。',
      preview_TurnOn: '打开',
      preview_Cancel: '取消',
      previewData: [
        "窗外的麻雀在电线杆上多嘴",
        "你说这一句很有夏天的感觉",
        "手中的铅笔在纸上来来回回",
        "我用几行字形容你是我的谁",
        "秋刀鱼的滋味猫跟你都想了解",
        "初恋的香味就这样被我们寻回",
        "那温暖的阳光像刚摘的鲜艳草莓",
        "你说你舍不得吃掉这一种感觉",
        "雨下整夜我的爱溢出就像雨水",
        "院子落叶跟我的思念厚厚一叠",
        "几句是非也无法将我的热情冷却",
        "你出现在我诗的每一页",
        "雨下整夜我的爱溢出就像雨水",
        "窗台蝴蝶像诗里纷飞的美丽章节",
        "我接着写",
        "把永远爱你写进诗的结尾",
        "你是我唯一想要的了解",
        "雨下整夜我的爱溢出就像雨水",
        "院子落叶跟我的思念厚厚一叠",
        "几句是非也无法将我的热情冷却",
        "你出现在我诗的每一页",
        "那饱满的稻穗幸福了这个季节",
        "而你的脸颊像田里熟透的蕃茄",
        "你突然对我说七里香的名字很美",
        "我此刻却只想亲吻你倔强的嘴",
        "雨下整夜我的爱溢出就像雨水",
        "院子落叶跟我的思念厚厚一叠",
        "几句是非也无法将我的热情冷却",
        "你出现在我诗的每一页",
        "整夜我的爱溢出就像雨水",
        "窗台蝴蝶像诗里纷飞的美丽章节",
        "我接着写",
        "把永远爱你写进诗的结尾",
        "你是我唯一想要的了解"
      ],
      enableLocalServer: '启用本地服务',
      localServerPort: '本地服务端口',
      remoteServerURL: '远程服务 URL',
      currentVersion: '当前版本',
    })
  }
};

/**
 * Choose phrases in the target language
 * @param targetLanguage
 * @param module
 * @return {CreekTrayWords|CreekPreferencesWords}
 */
export function i18n(targetLanguage, module) {
  logger.debug('i18n', `target lang: ${targetLanguage}`);

  let lang = 'en';
  for (const language in allLanguages) {
    if (language === targetLanguage) {
      lang = language;
    }
  }

  const words = allLanguages[lang][module];
  logger.debug('i18n', `selected lang: ${lang}, module: ${module}`);
  return words;
}

export {MODULE_TRAY, MODULE_PREFERENCES};
