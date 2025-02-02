import { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Pressable } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Dialog } from '@fruits-chain/react-native-xiaoshu'
import AddPopup from '@/components/AddPopup'
import { billDetail, deleteBill } from '@/api/bill'
import dayjs from 'dayjs'
import { router } from 'expo-router'

interface Detail {
  id: number
  amount: number
  date: string
  remark: string
  type_id: number
  type_name: string
  pay_type: number
}

const Detail = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [visible, setVisible] = useState(false)
  const [detail, setDetail] = useState<Detail>()

  useEffect(() => {
    getDetail()
  }, [id])

  const getDetail = () => {
    console.log('getDetail')
    billDetail({ id: Number(id) }).then(res => {
      console.log('res', res.data)
      setDetail(res.data)
    })
  }

  const handleDelete = () => {
    Dialog.confirm({
      title: '确认要删除吗',
      message:
        '删除后将无法恢复',
      confirmButtonColor: '#F30',
      confirmButtonText: '删除'
    }).then((action) => {
      if (action === 'confirm') {
        deleteBill({ id: Number(id) }).then(res => {
          console.log('res', res.data)
          router.back()
        })
      }
    })
  }

  return <SafeAreaView className="h-full bg-[#fff]">
    <View className="w-full flex-row justify-center items-center border-b border-zinc-100 pb-2">
      <Text className="text-2xl font-bold">账单详情</Text>
    </View>
    <View className="flex-1 w-full bg-[#f5f5f5]">
      <View className='w-[80%] bg-white rounded-lg m-auto mt-4 p-6'>
        <View className='flex-row items-center justify-center mb-2'>
          <Text className='text-base'>{detail?.type_name}</Text>
        </View>
        <View className='flex-row items-center justify-center mb-4'>
          <Text className='text-2xl font-bold'>{detail?.pay_type == 1 ? '-' : '+'}¥{detail?.amount}</Text>
        </View>
        <View className='flex-row items-center mb-2 gap-4'>
          <Text className='text-base text-zinc-500'>记录时间</Text>
          <Text className='text-base'>{dayjs(Number(detail?.date)).format('YYYY-MM-DD HH:mm')}</Text>
        </View>
        <View className='flex-row items-center gap-4 mb-6'>
          <Text className='text-base text-zinc-500'>备注</Text>
          <Text className='text-base'>{detail?.remark}</Text>
        </View>
        <View className='flex-row items-center justify-center gap-8'>
          <Pressable onPress={handleDelete} className='w-[40%] bg-red-500 p-2 rounded-lg items-center'>
            <Text className='text-base text-white'>删除</Text>
          </Pressable>
          <Pressable onPress={() => setVisible(true)} className='w-[40%] bg-blue-500 p-2 rounded-lg items-center'>
            <Text className='text-base text-white'>编辑</Text>
          </Pressable>
        </View>
      </View>
    </View>
    <AddPopup id={Number(id)} visible={visible} setVisible={setVisible} onCb={getDetail} />
  </SafeAreaView>
}

export default Detail