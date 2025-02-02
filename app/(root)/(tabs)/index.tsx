import { View, Text, StatusBar, Platform, Pressable, FlatList, Image, RefreshControl, ActivityIndicator, AppState } from "react-native";
import { useEffect, useCallback, useState } from "react";
import useRootStore from "@/store/rootStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getBillList } from "@/api/bill";
import dayjs from "dayjs";
import { DatePicker, Picker } from '@fruits-chain/react-native-xiaoshu'
import { add } from "@/constants/image";
import { router } from "expo-router";
import AddPopup from "@/components/AddPopup";

interface ItemProps {
  date: string;
  bills: BillProps[];
}

interface BillProps {
  id: number;
  type_name: string;
  pay_type: number;
  amount: number;
  date: string;
  remark: string;
}

const Index = () => {
  const { setCurrentTab, typeListAll } = useRootStore();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [billList, setBillList] = useState([]);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [selectMonth, setSelectMonth] = useState(new Date())
  const [typeObj, setTypeObj] = useState<any>()
  const [visible, setVisible] = useState(false)
  const [appState, setAppState] = useState(AppState.currentState)
  const insets = useSafeAreaInsets();
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

  useEffect(() => {
    getList(page == 1 ? 'init' : '');
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        if (billList.length == 0) getList(page == 1 ? 'init' : '');
      }
      setAppState(nextAppState);
    });

    return () => subscription.remove();
  }, [page, selectMonth, typeObj]);

  const getList = (type: string) => {
    getBillList({
      date: dayjs(selectMonth).format('YYYY-MM'),
      page: page,
      page_size: 5,
      type_id: typeObj?.value ?? 'all'
    }).then((res) => {
      setTotalExpense(res.data.totalExpense)
      setTotalIncome(res.data.totalIncome)
      if (res.data.list.length) {
        const _list = type == 'init' ? res.data.list : billList.concat(res.data.list);
        setBillList(_list);
        setIsEnd(false)
      } else {
        setIsEnd(true)
      }
      setLoading(false)
      setRefreshing(false)
    }).catch(err => {
      console.log('err', err);
    });
  }

  const onRefresh = () => {
    if (page == 1) return
    setRefreshing(true);
    setPage(1);
  }

  const loadMoreData = () => {
    if (loading || isEnd) return;
    setLoading(true);
    setPage(page + 1);
  }

  const handleSelectMonth = () => {
    DatePicker({
      title: '选择月份',
      mode: 'Y-M',
      testID: 'date-picker-test',
    }).then(({ action, value }) => {
      console.log('单选:Y-D:Promise  =>>  action  =>', action)
      console.log('单选:Y-D:Promise  =>>  value  =>', value)
      if (action == 'confirm') {
        setSelectMonth(value)
      }
    })
  }

  const handleSelectType = () => {
    Picker({
      title: "选择类型",
      columns: typeListAll
    }).then(({ action, columns, values }) => {
      const val: any = columns[0]
      if (action == 'confirm') setTypeObj(val)
    })
  }

  const handleAddBill = () => {
    setVisible(true)
  }

  return (
    <SafeAreaView className="h-full bg-[#f5f5f5]">
      <View className="w-full bg-[#1683fc] justify-between pb-4" style={{ marginTop: -insets.top, height: Platform.OS === 'ios' ? 160 : 120 }}>
        <View className="w-full flex-row items-center">
          <View className="w-full flex-row items-end px-6" style={{ paddingTop: Platform.OS === 'ios' ? insets.top + 20 : 20 }}>
            <Text className="text-white text-[14px] pb-[2px]">总支出：</Text>
            <Text className="text-white text-[20px] font-bold">¥{totalExpense.toFixed(2)}</Text>
            <Text className="text-white text-[14px] ml-4 pb-[2px]">总收入：</Text>
            <Text className="text-white text-[20px] font-bold">¥{totalIncome.toFixed(2)}</Text>
          </View>
        </View>
        <View className="w-full flex-row justify-end gap-4 px-6">
          <Pressable onPress={handleSelectType} className="bg-[#1476e2] rounded-full px-3 py-1">
            <Text className="text-white text-[14px]">{typeObj?.label || '全部类型'}</Text>
          </Pressable>
          <Pressable onPress={handleSelectMonth} className="bg-[#1476e2] rounded-full px-3 py-1">
            <Text className="text-white text-[14px]">{dayjs(selectMonth).format('YYYY-MM')}</Text>
          </Pressable>
        </View>
      </View>
      <View className="flex-1 bg-white pt-4 pb-20">
        <FlatList
          data={billList as ItemProps[]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <View className="w-[90%] bg-white m-auto mb-4 shadow-md shadow-zinc-300 rounded-lg">
            <View className="bg-[#f9f9f9] flex-row items-center justify-between p-4 rounded-t-lg">
              <Text className="text-xl font-bold">{item.date}</Text>
              <View className="flex-row items-center gap-2">
                <Image source={{ uri: "https://s.yezgea02.com/1615953405599/zhi%402x.png" }} className="size-4" />
                <Text className="text-xl">¥{item.bills.filter(m => m.pay_type == 1).reduce((acc, cur) => acc + Number(cur.amount), 0)}</Text>
                <Image source={{ uri: "https://s.yezgea02.com/1615953405599/shou%402x.png" }} className="size-4" />
                <Text className="text-xl">¥{item.bills.filter(m => m.pay_type == 2).reduce((acc, cur) => acc + Number(cur.amount), 0)}</Text>
              </View>
            </View>
            {
              item.bills.map((bill: BillProps, idx: number) => (
                <Pressable onPress={() => router.push(`/detail/${bill.id}`)} className={`bg-white p-4 rounded-b-lg ${idx < item.bills.length - 1 ? 'border-b border-zinc-100' : ''}`} key={bill.id.toString()}>
                  <View className="flex-row items-center justify-between mb-4">
                    <Text>{bill.type_name}</Text>
                    <Text className={`${bill.pay_type == 1 ? 'text-green-500' : 'text-red-500'} text-xl`}>{bill.pay_type == 1 ? '-' : '+'}¥{Number(bill.amount).toFixed(2)}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-sm">{dayjs(Number(bill.date) / 1000).format('HH:mm')}</Text>
                    {bill.remark ? <Text className="text-sm">｜{bill.remark}</Text> : null}
                  </View>
                </Pressable>
              ))
            }
          </View>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1683fc']} />
          }
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.2}
          ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="#1683fc" /> : hasMore ? null : <Text style={{ textAlign: 'center', padding: 10 }}>没有更多数据了</Text>}
        />
      </View>
      <Pressable onPress={handleAddBill} className="absolute z-30 right-4 bottom-[150] p-1 rounded-full bg-[#1683fc] justify-center items-center shadow-md shadow-zinc-400">
        <Image source={add} tintColor={'#fff'} className="size-14" />
      </Pressable>
      <AddPopup visible={visible} setVisible={setVisible} onCb={getList} />
    </SafeAreaView>
  );
};

export default Index;
