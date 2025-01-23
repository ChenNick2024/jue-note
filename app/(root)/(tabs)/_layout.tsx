/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-23 13:45:23
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-23 16:37:29
 * @FilePath: /jue-note/app/(root)/(tabs)/_layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Tabs } from "expo-router";
import { View, Text, Image } from "react-native";
import icons from "@/constants/icons";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "white",
        position: "absolute",
        borderTopColor: "#0061FF1A",
        borderTopWidth: 1,
        minHeight: 70
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "首页",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className="flex items-center justify-center mt-3">
              <Image source={icons.home} tintColor={focused ? "#0061ff" : "#666876"} resizeMode="contain" className="size-6" />
              <Text className={`${focused ? "text-primary-300" : "text-black-100"} text-xs font-bold`}>首页</Text>
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
              <Image source={icons.data} tintColor={focused ? "#0061ff" : "#666876"} resizeMode="contain" className="size-6" />
              <Text className={`${focused ? "text-primary-300" : "text-black-100"} text-xs font-bold`}>数据</Text>
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
              <Image source={icons.person} tintColor={focused ? "#0061ff" : "#666876"} resizeMode="contain" className="size-6" />
              <Text className={`${focused ? "text-primary-300" : "text-black-100"} text-xs`}>我的</Text>
            </View>
          )
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
