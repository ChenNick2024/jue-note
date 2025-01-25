/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-25 08:59:41
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-25 15:10:32
 * @FilePath: /jue-note/app/login.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from "react";
import { View, Text, TextInput, Button, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/user";
import { router } from "expo-router";
import useRootStore from "@/store/rootStore";
import { getUserInfo } from "@/api/user";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mobile, lock } from "@/constants/image";

const Login = () => {
  const insets = useSafeAreaInsets();
  const { setToken, setUserInfo } = useRootStore();
  const { mutate: _getUserInfo } = useMutation({
    mutationFn: () => getUserInfo(),
    onSuccess: ({ data}) => {
      console.log('用户信息', data);
      setUserInfo(data);
      router.replace("/mine");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { mutate: _login } = useMutation({
    mutationFn: (params: { username: string; password: string }) => login(params),
    onSuccess: async ({ data }) => {
      console.log('登录成功', data);
      setToken(data.token);
      _getUserInfo();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(1);

  const handleLogin = () => {
    if (!username || !password) {
      return;
    }
    _login({ username, password });
  };

  return (
    <View className="w-full h-full">
      <LinearGradient
        colors={['#6fb9f8', '#3daaf85e', '#49d3fc1a', '#3fd3ff00']}
        locations={[0, 0.3, 0.6, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Image 
          source={{ uri: 'https://s.yezgea02.com/1616032174786/cryptocurrency.png' }} 
          className="w-full h-80"
        />
        <View className="flex-row px-6 gap-4">
          <TouchableOpacity className={`h-7 ${active === 1 ? 'border-b-2 border-primary-300' : ''}`} onPress={() => setActive(1)}>
            <Text
              className="text-primary-300"
            >登录</Text>
          </TouchableOpacity>
          <TouchableOpacity className={`h-7 ${active === 2 ? 'border-b-2 border-primary-300' : ''}`} onPress={() => setActive(2)}>
            <Text
              className="text-primary-300"
            >注册</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-col px-6 py-10 gap-6">
          <View className="flex-row items-center gap-2">
            <Image source={mobile} className="size-8" />
            <TextInput className="h-10" placeholder="请输入账号" value={username} onChangeText={setUsername} />
          </View>
          <View className="flex-row items-center gap-2">
            <Image source={lock} className="size-8 mb-1" />
            <TextInput className="h-10" placeholder="请输入密码" value={password} onChangeText={setPassword} />
          </View>
          <TouchableOpacity onPress={handleLogin} className="bg-primary-300 shadow-md shadow-zinc-300 rounded-lg w-full py-3 mt-5">
            <View className="flex flex-row items-center justify-center">
              <Text className="text-lg font-rubik-medium text-white ml-2">登录</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Login;
