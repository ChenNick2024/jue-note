/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-23 15:56:40
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-26 13:22:18
 * @FilePath: /jue-note/app/(root)/_layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect } from "react";
import { Slot } from "expo-router";
import useRootStore from "@/store/rootStore";

export default function RootLayout() {
  const { updateUserInfo } = useRootStore();
  useEffect(() => {
    updateUserInfo();
  }, []);
  return <Slot />;
}
