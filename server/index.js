const md5File = require("md5-file");
const path = require("path");

const ignoreStyles = require("ignore-styles");
const register = ignoreStyles.default;
register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) => {
  if (
    [".gif", ".jpeg", ".jpg", ".png", ".svg"].find(f => filename.endsWith(f))
  ) {
    const hash = md5File.sync(filename).slice(0, 8);
    const bn = path.basename(filename).replace(/(\.\w{3})$/, `.${hash}$1`);

    mod.exports = `/static/media/${bn}`;
  } else {
    return ignoreStyles.noOp();
  }
});

require("@babel/polyfill");
require("@babel/register")({
  ignore: ["node_modules", /\/(build|node_modules)\//],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "dynamic-import-node",
    "react-loadable/babel"
  ]
});
require("./server");
