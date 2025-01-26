/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-26 10:16:57
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-26 13:22:23
 * @FilePath: /jue-note/app/(root)/userinfo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import useRootStore from "@/store/rootStore";
import Toast from "react-native-toast-message";
import { uploadAvatar, updateUserInfo as updateUserInfoApi } from "@/api/user";
import { router } from "expo-router";

const UserInfo = () => {
  const { userInfo, updateUserInfo } = useRootStore();
  const [avatar, setAvatar] = useState(userInfo?.avatar ? `${userInfo.avatar.replace('http://', 'https://')}` : '');
  const [signature, setSignature] = useState(userInfo?.signature);


  const handleUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Toast.show({
        type: 'error',
        text1: '需要媒体库权限以选择图片！'
      });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 仅允许选择图片
      allowsEditing: true, // 允许剪裁
      quality: 1, // 图片质量
    })

    if (!result.canceled) {
      console.log(result);
      const data = new FormData();
      data.append('files', {
        uri: result.assets[0].uri,
        name: result.assets[0].fileName,
        type: "image/jpeg"
      });
      try {
        const res = await uploadAvatar(data);
        setAvatar(res.data ? `https://api.chennick.wang${res.data}` : '');
      } catch (error) {
        console.log('error', error);
      }
    }
  }

  const handleSave = () => {
    updateUserInfoApi({ avatar, signature }).then(() => {
      updateUserInfo();
      router.back();
    }).catch((error) => {
      console.log('保存失败', error);
    });
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-row items-center justify-center">
        <Text className="text-xl font-bold">用户信息</Text>
      </View>
      <View className="flex-row items-center w-[90%] mx-auto py-6 gap-4 border-b border-gray-200">
        <Image source={{ uri: avatar ? `${avatar.replace('http://', 'https://')}` : '' }} className="size-20 rounded-full" />
        <View className="flex-col gap-4">
          <Text className="text-xs">支持jpg、png、jpeg格式，大小不超过200KB</Text>
          <TouchableOpacity onPress={handleUpload} className="bg-[#0061ff] w-[100px] p-2 rounded-md">
            <Text className="text-white text-center text-sm">点击上传</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-[90%] mx-auto py-6 gap-4">
        <Text className="text-xl font-medium">个性签名：</Text>
        <TextInput className="w-full border-b border-gray-200 h-12" value={signature} onChangeText={setSignature} />
      </View>
      <TouchableOpacity onPress={handleSave} className="w-[90%] bg-primary-300 shadow-md shadow-zinc-300 rounded-lg py-3 mt-20 mx-auto">
        <View className="flex flex-row items-center justify-center">
          <Text className="text-lg font-rubik-medium text-white ml-2">保存</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default UserInfo;