/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-31 09:36:02
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-02-03 09:31:47
 * @FilePath: /jue-note/components/AddPopup.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useEffect } from 'react'
import { View, Text, Pressable, FlatList, Image } from 'react-native'
import { Popup, Tag, Dialog, DatePicker, Toast } from '@fruits-chain/react-native-xiaoshu'
import dayjs from 'dayjs'
import { back, write } from "@/constants/image";
import { addBill, billDetail, editBill } from '@/api/bill'
import useRootStore from '@/store/rootStore'

interface Params {
  id?: string | number
  date: number
  amount: string
  type_id: string
  type_name: string
  pay_type: number
  remark: string
}

const AddPopup = ({ id, visible, setVisible, onCb }: { id?: string | number, visible: boolean, setVisible: (visible: boolean) => void, onCb: (cb: string) => void }) => {
  const { typeList } = useRootStore();
  const [type, setType] = useState(1)
  const [selectDate, setSelectDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [amount, setAmount] = useState('')
  const [selectAddType, setSelectAddType] = useState<any>(null)
  const [remark, setRemark] = useState('')

  useEffect(() => {
    if (visible && id) {
      billDetail({ id }).then(res => {
        setSelectDate(dayjs(Number(res.data.date)).format('YYYY-MM-DD'))
        setAmount(res.data.amount)
        setSelectAddType(typeList.find((item: any) => item.id == res.data.type_id))
        setRemark(res.data.remark)
        setType(res.data.pay_type)
      })
    }
  }, [visible, id])

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

  const handleSelectDate = () => {
    DatePicker({
      title: '选择日期',
      mode: 'Y-D',
      testID: 'date-picker-test1',
    }).then(({ action, value }) => {
      if (action == 'confirm') setSelectDate(value.toISOString())
    })
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
    const api = id ? editBill : addBill
    const params: Params = {
      date: dayjs(selectDate).unix() * 1000,
      amount: amount,
      type_id: selectAddType?.id,
      type_name: selectAddType?.label,
      pay_type: type,
      remark: remark
    }
    if (id) {
      params.id = id
    }
    api(params).then(res => {
    }).then(res => {
      onCb('init')
      setVisible(false)
      setAmount('')
      Toast.success(id ? '修改成功' : '添加成功')
    }).catch(err => {
      Toast.fail('添加失败')
    })
  }

  return <Popup
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
            <Tag color={`${type == 1 ? '#1683fc' : '#f5f5f5'}`} textColor={`${type == 1 ? '#fff' : '#000'}`} size="l" innerStyle={{ borderRadius: 20 }}>支出</Tag>
          </Pressable>
          <Pressable onPress={() => setType(2)}>
            <Tag color={`${type == 2 ? '#FFA238' : '#f5f5f5'}`} textColor={`${type == 2 ? '#fff' : '#000'}`} size="l" innerStyle={{ borderRadius: 20 }}>收入</Tag>
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
          data={typeList}
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
}

export default AddPopup