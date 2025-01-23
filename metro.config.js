/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-23 15:21:39
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-23 16:09:55
 * @FilePath: /jue-note/metro.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./app/global.css" });
