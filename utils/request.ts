/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-24 14:25:11
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-25 09:38:37
 * @FilePath: /jue-note/utils/request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, { AxiosRequestConfig } from "axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
const instance = axios.create({
  baseURL: "http://121.43.166.28:7009/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    console.log('token', token);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (typeof response.data !== "object") {
      console.log("服务器错误");
    }
    if (response.data.code != 200) {
      if (response.data.msg) {
        console.log('errormsg', response.data.msg);
      }
      if (response.data.code == 401) {
        router.replace("/login");
      }
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return instance.request(config);
};
