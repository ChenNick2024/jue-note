/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-23 13:45:43
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-28 11:58:50
 * @FilePath: /jue-note/app/(root)/(tabs)/mine.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useCallback } from "react";
import { View, Text, Image, Platform, StatusBar, Button, TouchableOpacity, Pressable } from "react-native";
import useRootStore from "@/store/rootStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { logState } from "@/utils/tool";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import icons from "@/constants/icons";
const Mine = () => {
  const { clearToken, clearUserInfo, userInfo, setCurrentTab } = useRootStore();
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
      setCurrentTab('mine');
      console.log('mine');
      return () => {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('white');
      }
    }, [])
  )

  const handleLogout = () => {
    clearToken();
    clearUserInfo();
    router.push('/login');
  }
  return (
    <SafeAreaView className="relative bg-[#f5f5f5] h-full">
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
          <Image source={{ uri: userInfo?.avatar ? `${userInfo?.avatar.replace('http://', 'https://')}` : '' }} className="size-16 rounded-full" />
        </View>
      </View>
      <View className="w-[90%] bg-white rounded-lg mx-auto shadow-md shadow-gray-400">
        <TouchableOpacity onPress={() => router.push('/userinfo')} className="flex-row items-center justify-between gap-2 px-4 py-4 border-b border-gray-100">
          <View className="flex-row items-center gap-2">
            <Image source={icons.banshou} tintColor="#0061ff" resizeMode="contain" className="size-6" />
            <Text className="text-[#333] text-base">用户信息修改</Text>
          </View>
          <Image source={icons.rightarrow} tintColor="#888" resizeMode="contain" className="size-5" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/resetpass')} className="flex-row items-center justify-between gap-2 px-4 py-4 border-b border-gray-100">
          <View className="flex-row items-center gap-2">
            <Image source={icons.dunpai} tintColor="#0061ff" resizeMode="contain" className="size-6" />
            <Text className="text-[#333] text-base">重置密码</Text>
          </View>
          <Image source={icons.rightarrow} tintColor="#888" resizeMode="contain" className="size-5" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/about')} className="flex-row items-center justify-between gap-2 px-4 py-4">
          <View className="flex-row items-center gap-2">
            <Image source={icons.women} tintColor="#0061ff" resizeMode="contain" className="size-6" />
            <Text className="text-[#333] text-base">关于我们</Text>
          </View>
          <Image source={icons.rightarrow} tintColor="#888" resizeMode="contain" className="size-5" />
        </TouchableOpacity>
      </View>
      <Pressable onPress={handleLogout} className="w-[90%] h-[50] flex items-center justify-center bg-red-500 rounded-lg mx-auto shadow-md shadow-gray-400 absolute bottom-[120px] left-[50%] translate-x-[-50%]">
        <Text className="text-white text-xl">退出登录</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Mine;
