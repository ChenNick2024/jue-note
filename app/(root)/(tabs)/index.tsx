/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-23 13:45:32
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-30 20:56:58
 * @FilePath: /jue-note/app/(root)/(tabs)/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-23 13:45:32
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-30 09:50:39
 * @FilePath: /jue-note/app/(root)/(tabs)/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View, Text, Button, StatusBar, Platform, Pressable, FlatList, Image, RefreshControl, ActivityIndicator, TouchableOpacity } from "react-native";
import { useEffect, useCallback, useState } from "react";
import useRootStore from "@/store/rootStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getBillList, getBillTypeList } from "@/api/bill";
import dayjs from "dayjs";
import { DatePicker, Picker } from '@fruits-chain/react-native-xiaoshu'

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
  const { setCurrentTab } = useRootStore();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [billList, setBillList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [selectMonth, setSelectMonth] = useState(new Date())
  const [typeObj, setTypeObj] = useState<any>()
  const [typeList, setTypeList] = useState([])

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
    getBillTypeList().then(res => {
      const _data: any = [{ label: '全部', value: 'all' }].concat(res.data.list.map((item: any) => ({ label: item.name, value: item.id })))
      setTypeList(_data)
    })
  }, [])

  useEffect(() => {
    getList(page == 1 ? 'init' : '');
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
      const _list = type == 'init' ? res.data.list : billList.concat(res.data.list);
      setBillList(_list);
      setTotal(res.data.totalPage)
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
    if (loading || page * 5 >= total) return;
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
      columns: typeList
    }).then(({ action, columns, values }) => {
      const val: any = columns[0]
      if (action == 'confirm') setTypeObj(val)
    })
  }

  const handleAddBill = () => {
    console.log('handleAddBill');
  }

  return (
    <SafeAreaView className="h-full bg-[#f5f5f5]">
      <View className="w-full bg-[#1683fc] justify-between pb-4" style={{ marginTop: -insets.top, height: Platform.OS === 'ios' ? 200 : 180 }}>
        <View>
          <View className="w-full flex-row items-end px-6" style={{ paddingTop: Platform.OS === 'ios' ? insets.top + 20 : 20 }}>
            <Text className="text-white text-[14px]">总支出：</Text>
            <Text className="text-white text-[20px] font-bold">¥{totalExpense.toFixed(2)}</Text>
          </View>
          <View className="w-full flex-row items-end px-6 pt-[20px]">
            <Text className="text-white text-[14px]">总收入：</Text>
            <Text className="text-white text-[20px] font-bold">¥{totalIncome.toFixed(2)}</Text>
          </View>
        </View>
        <View className="w-full flex-row justify-end gap-4 px-6">
          <Pressable onPress={handleSelectType} className="bg-white rounded-full px-4 py-2">
            <Text className="text-black text-[14px]">{typeObj?.label || '全部类型'}</Text>
          </Pressable>
          <Pressable onPress={handleSelectMonth} className="bg-white rounded-full px-4 py-2">
            <Text className="text-black text-[14px]">{dayjs(selectMonth).format('YYYY-MM')}</Text>
          </Pressable>
        </View>
      </View>
      <View className="flex-1 bg-white pt-4 pb-20">
        <FlatList
          data={billList as ItemProps[]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <View className="w-[90%] bg-white m-auto mb-4 shadow-md shadow-zinc-300 rounded-lg">
            <View className="bg-[#f9f9f9] flex-row items-center justify-between p-4 rounded-t-lg">
              <Text className="text-[14px] font-bold">{item.date}</Text>
              <View className="flex-row items-center gap-2">
                <Image source={{ uri: "https://s.yezgea02.com/1615953405599/zhi%402x.png" }} className="size-4" />
                <Text className="text-[14px]">¥1.00</Text>
                <Image source={{ uri: "https://s.yezgea02.com/1615953405599/shou%402x.png" }} className="size-4" />
                <Text className="text-[14px]">¥12.00</Text>
              </View>
            </View>
            {
              item.bills.map((bill: BillProps, idx: number) => (
                <View className={`bg-white p-4 rounded-b-lg ${idx < item.bills.length - 1 ? 'border-b border-zinc-100' : ''}`} key={idx}>
                  <View className="flex-row items-center justify-between mb-4">
                    <Text>{bill.type_name}</Text>
                    <Text className={`${bill.pay_type == 1 ? 'text-green-500' : 'text-red-500'}`}>{bill.pay_type == 1 ? '+' : '-'}¥{bill.amount}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text>{dayjs(Number(bill.date) / 1000).format('HH:mm')}</Text>
                    {bill.remark ? <Text>｜备注</Text> : null}
                  </View>
                </View>
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
      <TouchableOpacity onPress={handleAddBill} className="absolute z-30 right-4 bottom-[150] w-[50] h-[50] rounded-full bg-[#1683fc] justify-center items-center shadow-md shadow-zinc-300">
        <Text className="text-white text-[32px]">+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
