/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-23 13:45:32
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-29 11:32:50
 * @FilePath: /jue-note/app/(root)/(tabs)/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View, Text, Button, StatusBar, Platform, Pressable, FlatList, Image, RefreshControl, ActivityIndicator } from "react-native";
import { useEffect, useCallback, useState } from "react";
import useRootStore from "@/store/rootStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Index = () => {
  const { setCurrentTab } = useRootStore();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const insets = useSafeAreaInsets();
  console.log('insets', insets);
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#1683fc');
      setCurrentTab('index');
      console.log('index');
      return () => {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('white');
      }
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  const loadMoreData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  return (
    <SafeAreaView className="h-full bg-[#f5f5f5]">
      <View className="w-full bg-[#1683fc] justify-between pb-4" style={{ marginTop: -insets.top, height: Platform.OS === 'ios' ? 200 : 180 }}>
        <View>
          <View className="w-full flex-row items-end px-6" style={{ paddingTop: Platform.OS === 'ios' ? insets.top + 20 : 20 }}>
            <Text className="text-white text-[14px]">总支出：</Text>
            <Text className="text-white text-[20px] font-bold">¥10000.00</Text>
          </View>
          <View className="w-full flex-row items-end px-6 pt-[20px]">
            <Text className="text-white text-[14px]">总收入：</Text>
            <Text className="text-white text-[20px] font-bold">¥8000.00</Text>
          </View>
        </View>
        <View className="w-full flex-row justify-end gap-4 px-6">
          <Pressable className="bg-white rounded-full px-4 py-2">
            <Text className="text-black text-[14px]">全部类型</Text>
          </Pressable>
          <Pressable className="bg-white rounded-full px-4 py-2">
            <Text className="text-black text-[14px]">2025-01</Text>
          </Pressable>
        </View>
      </View>
      <View className="flex-1 bg-white pt-4 pb-20">
        <FlatList
          data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <View className="w-[90%] bg-white m-auto mb-4 shadow-md shadow-zinc-300 rounded-lg">
            <View className="bg-[#f9f9f9] flex-row items-center justify-between p-4 rounded-t-lg">
              <Text className="text-[14px] font-bold">{item.id} 2025-01-01</Text>
              <View className="flex-row items-center gap-2">
                <Image source={{ uri: "https://s.yezgea02.com/1615953405599/zhi%402x.png" }} className="size-4" />
                <Text className="text-[14px]">¥1.00</Text>
                <Image source={{ uri: "https://s.yezgea02.com/1615953405599/shou%402x.png" }} className="size-4" />
                <Text className="text-[14px]">¥12.00</Text>
              </View>
            </View>
            <View className="bg-white p-4 rounded-b-lg">
              <View className="flex-row items-center justify-between mb-4">
                <Text>日用</Text>
                <Text>¥1.00</Text>
              </View>
              <View className="flex-row items-center">
                <Text>16:41</Text>
                <Text>｜备注</Text>
              </View>
            </View>
          </View>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1683fc']} />
          }
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.2}
          ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="#1683fc" /> : hasMore ? null : <Text style={{ textAlign: 'center', padding: 10 }}>没有更多数据了</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;
