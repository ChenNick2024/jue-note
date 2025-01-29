/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-24 14:25:11
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-29 19:34:54
 * @FilePath: /jue-note/utils/request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, { AxiosRequestConfig } from "axios";
import { router } from "expo-router";
import useRootStore from "@/store/rootStore";
const instance = axios.create({
  baseURL: "https://api.chennick.wang/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const { token } = useRootStore.getState();
    if (token) {
      config.headers.Authorization = token;
    }
    if (config.url === '/upload') {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
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

/**
 * GET请求带参数
 * @param url 请求地址
 * @param params 请求参数
 * @returns Promise
 */
export const get = (url: string, params?: Record<string, any>) => {
  // 构建带查询参数的URL
  const queryString = params
    ? `?${Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')}`
    : '';
  
  return request(url + queryString, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
