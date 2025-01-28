/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-25 08:57:55
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-28 10:49:09
 * @FilePath: /jue-note/api/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from "@/utils/request";

export const login = (params: { username: string; password: string }) => {
  return request({
    url: "/user/login",
    method: "POST",
    data: params,
  });
};

export const getUserInfo = () => {
  return request({
    url: "/user/get_userinfo",
    method: "GET",
  });
};

export const uploadAvatar = (data: FormData) => {
  return request({
    url: "/upload",
    method: "POST",
    data,
  });
};

export const updateUserInfo = (data: { avatar: string; signature: string }) => {
  return request({
    url: "/user/edit_userinfo",
    method: "POST",
    data,
  });
};

export const register = (data: { username: string; password: string }) => {
  return request({
    url: "/user/register",
    method: "POST",
    data,
  });
};

export const resetPass = (data: { oldPass: string; newPass: string; confirmPass: string }) => {
  return request({
    url: "/user/modify_pass",
    method: "POST",
    data: {
      old_pass: data.oldPass,
      new_pass: data.newPass,
      new_pass2: data.confirmPass,
    },
  });
};
