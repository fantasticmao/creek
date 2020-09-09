import logger from "../main/logger";

class CreekTrayWords {
  stateOn;
  stateOff;
  turnOn;
  turnOff;
  checkForUpdates;
  preferences;
  aboutCreek;
  quiteCreek;

  constructor(options) {
    this.stateOn = options.stateOn;
    this.stateOff = options.stateOff;
    this.turnOn = options.turnOn;
    this.turnOff = options.turnOff;
    this.checkForUpdates = options.checkForUpdates;
    this.preferences = options.preferences;
    this.aboutCreek = options.aboutCreek;
    this.quiteCreek = options.quiteCreek;
  }
}

class CreekPreferencesWords {
  previewData;

  constructor(options) {
    this.previewData = options.previewData;
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
      aboutCreek: 'About Creek',
      quiteCreek: 'Quite Creek'
    }),
    'preferences': new CreekPreferencesWords({
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
      ]
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
      aboutCreek: '关于 Creek',
      quiteCreek: '退出 Creek'
    }),
    'preferences': new CreekPreferencesWords({
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
      ]
    })
  }
};

/**
 *
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
  logger.debug('i18n', `select lang: ${lang} module: ${module}`);
  return words;
}

export {MODULE_TRAY, MODULE_PREFERENCES};
