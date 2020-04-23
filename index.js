// https://blog.csdn.net/weixin_34055910/article/details/91472721 支持es6语法
require('babel-core/register');
// require the rest of the app that needs to be transpiled after the hook
const app = require('./app');