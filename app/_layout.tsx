/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-23 13:08:56
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-23 16:11:37
 * @FilePath: /jue-note/app/_layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Stack } from "expo-router";
import "./global.css";
export default function AppLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
