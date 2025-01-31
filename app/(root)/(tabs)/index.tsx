import { View, Text, Button, StatusBar, Platform, Pressable, FlatList, Image, RefreshControl, ActivityIndicator, TouchableOpacity } from "react-native";
import { useEffect, useCallback, useState } from "react";
import useRootStore from "@/store/rootStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getBillList, getBillTypeList, addBill } from "@/api/bill";
import dayjs from "dayjs";
import { DatePicker, Picker, Popup, Tag, Toast, Dialog } from '@fruits-chain/react-native-xiaoshu'
import { back, add, write } from "@/constants/image";

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
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState(1)
  const [selectAddType, setSelectAddType] = useState<any>()
  const [selectDate, setSelectDate] = useState(new Date())
  const [amount, setAmount] = useState('')
  const [remark, setRemark] = useState('')

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
      const _data: any = [{ label: '全部', value: 'all' }].concat(res.data.list.map((item: any) => ({ label: item.name, value: item.id, id: item.id })))
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
    setVisible(true)
  }

  const handleSelectDate = () => {
    DatePicker({
      title: '选择日期',
      mode: 'Y-D',
      testID: 'date-picker-test1',
    }).then(({ action, value }) => {
      if (action == 'confirm') setSelectDate(value)
    })
  }

  const handleNumberPress = (value: string | number) => {
    console.log('handleNumberPress', value);
    if (value == '⌨️') return
    if (value == '.') {
      if (amount.includes('.')) return
      setAmount(amount + '.')
    } else {
      setAmount(amount + value)
    }
  }

  const handleDelete = () => {
    setAmount(amount.slice(0, -1))
  }

  const handleConfirm = () => {
    if (!selectAddType?.id) {
      Toast.fail('请选择类型')
      return
    }
    if (!amount) {
      Toast.fail('请输入金额')
      return
    }
    console.log('handleConfirm');
    addBill({
      date: dayjs(selectDate).unix() * 1000,
      amount: amount,
      type_id: selectAddType?.id,
      type_name: selectAddType?.label,
      pay_type: type,
      remark: ''
    }).then(res => {
      getList('init')
      setVisible(false)
      setAmount('')
      Toast.success('添加成功')
    }).catch(err => {
      Toast.fail('添加失败')
    })
  }

  const handleEditRemark = () => {
    Dialog.input({
      safeAreaTop: 100,
      title: '备注',
      placeholder: '请输入备注',
      type: 'textarea',
      defaultValue: remark,
      onPressConfirm: t => {
        setRemark(t)
      },
    })
  }

  return (
    <SafeAreaView className="h-full bg-[#f5f5f5]">
      <View className="w-full bg-[#1683fc] justify-between pb-4" style={{ marginTop: -insets.top, height: Platform.OS === 'ios' ? 200 : 160 }}>
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
                <View className={`bg-white p-4 rounded-b-lg ${idx < item.bills.length - 1 ? 'border-b border-zinc-100' : ''}`} key={bill.id.toString()}>
                  <View className="flex-row items-center justify-between mb-4">
                    <Text>{bill.type_name}</Text>
                    <Text className={`${bill.pay_type == 1 ? 'text-green-500' : 'text-red-500'} text-xl`}>{bill.pay_type == 1 ? '+' : '-'}¥{Number(bill.amount).toFixed(2)}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-sm">{dayjs(Number(bill.date) / 1000).format('HH:mm')}</Text>
                    {bill.remark ? <Text className="text-sm">｜备注</Text> : null}
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
      <Pressable onPress={handleAddBill} className="absolute z-30 right-4 bottom-[150] p-1 rounded-full bg-[#1683fc] justify-center items-center shadow-md shadow-zinc-400">
        <Image source={add} tintColor={'#fff'} className="size-14" />
      </Pressable>
      <Popup
        safeAreaInsetBottom={true}
        safeAreaInsetTop={false}
        visible={visible}
        position="bottom"
        onPressOverlay={() => {
          setVisible(false)
        }}
        onRequestClose={() => {
          setVisible(false)
          return true
        }}
        round
      >
        <View className="w-full bg-white p-4">
          <View className="w-full flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Pressable onPress={() => setType(1)}>
                <Tag color={`${type == 1 ? '#1683fc' : '#f5f5f5'}`} textColor={`${type == 1 ? '#fff' : '#000'}`} size="l" innerStyle={{ borderRadius: 20 }}>收入</Tag>
              </Pressable>
              <Pressable onPress={() => setType(2)}>
                <Tag color={`${type == 2 ? '#FFA238' : '#f5f5f5'}`} textColor={`${type == 2 ? '#fff' : '#000'}`} size="l" innerStyle={{ borderRadius: 20 }}>支出</Tag>
              </Pressable>
            </View>
            <Pressable onPress={handleSelectDate}>
              <Text className="text-[14px] bg-[#f0f0f0] py-2 px-4 rounded-full">{dayjs(selectDate).format('YYYY-MM-DD')}</Text>
            </Pressable>
          </View>
          <View className="w-full flex-row items-center border-b border-zinc-100 pb-2">
            <Text className="text-[46px] font-bold">¥</Text>
            <Text className="text-[36px] font-bold">{amount}</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <FlatList
              data={typeList.filter((item: any) => item.value != 'all')}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              renderItem={({ item }) => <Pressable onPress={() => setSelectAddType(item)} className="w-[50px] py-4">
                <Tag color={`${selectAddType?.id == item.id ? '#1683fc' : '#f5f5f5'}`} textColor={`${selectAddType?.id == item.id ? '#fff' : '#000'}`} size="l" innerStyle={{ borderRadius: 20 }}>{item.label}</Tag>
              </Pressable>}
            />
          </View>
          <View className="flex-row items-center mb-4">
            <Text className="text-base">备注：</Text>
            <Text className="text-base">{remark}</Text>
            <Pressable onPress={handleEditRemark} className="flex-row items-center ml-2">
              <Image source={write} tintColor={'#1683fc'} className="size-5" />
            </Pressable>
          </View>
          <View className="w-full flex-row">
            <View className="w-3/4 flex-row flex-wrap border-l border-b border-zinc-100">
              {[1,2,3,4,5,6,7,8,9,'.',0,'⌨️'].map((item, index) => (
                <Pressable key={index} onPress={() => handleNumberPress(item)} className='w-1/3 h-[50px] flex items-center justify-center border-r border-t border-zinc-100'>
                  <Text className='text-2xl'>{item}</Text>
                </Pressable>
              ))}
            </View>
            <View className="w-1/4 border-t border-r border-zinc-100">
              <Pressable onPress={handleDelete} className="h-[100px] w-full flex items-center justify-center border-b border-zinc-100">
                <Image source={back} tintColor={'#222'} className="size-8" />
              </Pressable>
              <Pressable onPress={handleConfirm} className="h-[100px] w-full flex items-center justify-center border-b border-zinc-100 bg-primary-300">
                <Text className="text-white text-2xl">确认</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Popup>
    </SafeAreaView>
  );
};

export default Index;
