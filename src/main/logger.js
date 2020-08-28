// TODO support highlight
const logger = {
  info: function (tag, msg) {
    console.info(`[${tag}] ${msg}`);
  },
  debug: function (tag, msg) {
    console.debug(`[${tag}] ${msg}`);
  },
  error: function (tag, msg) {
    console.debug(`[${tag}] ${msg}`);
  }
};

export default logger;
