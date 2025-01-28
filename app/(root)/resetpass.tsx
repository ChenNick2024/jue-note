/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-28 10:25:00
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-28 10:48:25
 * @FilePath: /jue-note/app/(root)/resetpass.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from 'react'
import { SafeAreaView, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { resetPass } from '@/api/user';

const ResetPass = () => {
  const [oldPass, setOldPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")

  const handleSave = () => {
    if (!oldPass || !newPass || !confirmPass) {
      Alert.alert('请输入完整信息')
      return
    }
    if (newPass !== confirmPass) {
      Alert.alert('新密码与确认密码不一致')
      return
    }
    resetPass({ oldPass, newPass, confirmPass }).then(res => {
      Alert.alert('重置密码成功')
      router.back()
    }).catch(err => {
      Alert.alert(err.msg)
    })
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-row items-center justify-center mb-6">
        <Text className="text-xl font-bold">重置密码</Text>
      </View>
      <View className="flex-row items-center gap-4 w-[80%] mx-auto border-b border-gray-200">
        <Text className="w-[60px]">原密码</Text>
        <TextInput className="flex-1 h-14" value={oldPass} onChangeText={setOldPass} placeholder="请输入原密码" />
      </View>
      <View className="flex-row items-center gap-4 w-[80%] mx-auto border-b border-gray-200">
        <Text className="w-[60px]">新密码</Text>
        <TextInput className="flex-1 h-14" value={newPass} onChangeText={setNewPass} placeholder="请输入新密码" />
      </View>
      <View className="flex-row items-center gap-4 w-[80%] mx-auto border-b border-gray-200">
        <Text className="w-[60px]">确认密码</Text>
        <TextInput className="flex-1 h-14" value={confirmPass} onChangeText={setConfirmPass} placeholder="请确认新密码" />
      </View>
      <TouchableOpacity onPress={handleSave} className="w-[80%] bg-primary-300 shadow-md shadow-zinc-300 rounded-lg py-3 mt-20 mx-auto">
          <Text className="text-lg text-center font-rubik-medium text-white ml-2">保存</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ResetPass;
