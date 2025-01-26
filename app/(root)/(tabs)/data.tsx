/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-23 16:35:19
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-26 14:10:07
 * @FilePath: /jue-note/app/(root)/(tabs)/data.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View, Text } from "react-native";
import { useFocusEffect } from "expo-router";
import { useEffect, useCallback } from "react";
import useRootStore from "@/store/rootStore";

const Data = () => {
  const { setCurrentTab } = useRootStore();

  useFocusEffect(
    useCallback(() => {
      setCurrentTab('data');
      console.log('data');
    }, [])
  );
  return (
    <View>
      <Text>Data</Text>
    </View>
  );
}

export default Data;
