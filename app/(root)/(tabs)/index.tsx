/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-23 13:45:32
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-26 14:10:19
 * @FilePath: /jue-note/app/(root)/(tabs)/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View, Text, Button } from "react-native";
import { useEffect, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import useRootStore from "@/store/rootStore";

const Index = () => {
  const { setCurrentTab } = useRootStore();

  useFocusEffect(
    useCallback(() => {
      setCurrentTab('index');
      console.log('index');
    }, [])
  );
  return (
    <View className="flex items-center justify-center h-full bg-pink-300">
      <Text className="text-primary-300">Kdjadkas</Text>
    </View>
  );
};

export default Index;
