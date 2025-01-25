import { useEffect, useCallback } from "react";
import { View, Text, Image, Platform, StatusBar } from "react-native";
import useRootStore from "@/store/rootStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { logState } from "@/utils/tool";
import { useFocusEffect } from "@react-navigation/native";

const Mine = () => {
  const { clearToken, clearUserInfo, userInfo } = useRootStore();
  useEffect(() => {
    logState('rootStore');
  }, []);
  /**
   * 通过 useFocusEffect 获取底部Tabs被点击的触发事件，当被点击时，设置状态栏样式，当离开时，恢复状态栏样式
   * 其他方式都会污染全局状态栏，导致其他页面状态栏样式异常
  */
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#2e66de');
      return () => {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('white');
      }
    }, [])
  )
  return (
    <SafeAreaView className="relative bg-pink-300 h-full">
      <Image
        source={{ uri: "https://s.yezgea02.com/1615971681107/%E4%BD%8D%E5%9B%BE%402x.png" }}
        resizeMode="cover"
        className="w-full h-[200] absolute top-0"
      />
      <View className="flex-row justify-between p-10">
        <View className="gap-2">
          <Text className="text-white text-2xl font-medium">昵称：{userInfo?.username ?? '--'}</Text>
          <Text className="text-white text-base">个性签名：{userInfo?.signature ?? '--'}</Text>
        </View>
        <View>
          <Image source={{ uri: userInfo?.avatar }} className="size-16 rounded-full" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Mine;
