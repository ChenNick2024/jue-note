/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-25 08:59:41
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-25 11:05:02
 * @FilePath: /jue-note/app/login.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from "react";
import { View, Text, TextInput, Button, SafeAreaView } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/user";
import { router } from "expo-router";
import useRootStore from "@/store/rootStore";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/api/user";

const Login = () => {
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
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("111111");

  const handleLogin = () => {
    if (!username || !password) {
      return;
    }
    _login({ username, password });
  };

  return (
    <SafeAreaView className="h-full bg-pink-300">
      <TextInput placeholder="用户名" value={username} onChangeText={setUsername} />
      <TextInput placeholder="密码" value={password} onChangeText={setPassword} />
      <Button title="登录" onPress={handleLogin} />
    </SafeAreaView>
  );
};

export default Login;
