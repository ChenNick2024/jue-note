/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-23 13:45:23
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-30 10:01:05
 * @FilePath: /jue-note/app/(root)/(tabs)/_layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Tabs } from "expo-router";
import { View, Text, Image, Pressable } from "react-native";
import icons from "@/constants/icons";
import useRootStore from "@/store/rootStore";
const TabsLayout = () => {
  const { currentTab } = useRootStore();
  return (
    <Tabs
      initialRouteName={currentTab}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopWidth: 0,
          minHeight: 50
        },
        // 去除安卓点击涟漪效果，用背景覆盖掉
        tabBarItemStyle: {
          backgroundColor: "white"
        },
        // 页面跳转效果
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "首页",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className="flex items-center justify-center mt-3">
              <Image source={icons.home} tintColor={focused ? "#0061ff" : "#666876"} resizeMode="contain" className="size-7" />
              <Text className={`${focused ? "text-primary-300" : "text-black-100"} text-[12px]`}>首页</Text>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          title: "数据",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className="flex items-center justify-center mt-3">
              <Image source={icons.data} tintColor={focused ? "#0061ff" : "#666876"} resizeMode="contain" className="size-7" />
              <Text className={`${focused ? "text-primary-300" : "text-black-100"} text-[12px]`}>数据</Text>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="mine"
        options={{
          title: "我的",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View className="flex items-center justify-center mt-3">
              <Image source={icons.person} tintColor={focused ? "#0061ff" : "#666876"} resizeMode="contain" className="size-7" />
              <Text className={`${focused ? "text-primary-300" : "text-black-100"} text-[12px]`}>我的</Text>
            </View>
          )
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
