/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-29 17:34:22
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-02-03 13:44:56
 * @FilePath: /jue-note/api/bill.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from "@/utils/request";

export const getBillList = (params: { date: string; page: number; page_size: number, type_id: string | null }) => {
  const api = `/bill/list?page=${params.page}&page_size=${params.page_size}&type_id=${params.type_id}&date=${params.date}`
  console.log('api', api);
  return request({
    url: api,
    method: "GET"
  });
};

export const getBillTypeList = () => {
  return request({
    url: '/type/list',
    method: "GET"
  });
};

export const addBill = (params: { date: number; amount: string; type_id: string; type_name: string; pay_type: number; remark: string }) => {
  return request({
    url: '/bill/add',
    method: "POST",
    data: params
  });
};

export const editBill = (params: { id: number | string | undefined; date: number; amount: string; type_id: string; type_name: string; pay_type: number; remark: string }) => {
  return request({
    url: '/bill/update',
    method: "POST",
    data: params
  });
};

export const deleteBill = (params: { id: number | string }) => {
  return request({
    url: '/bill/delete',
    method: "POST",
    data: params
  });
};

export const billDetail = (params: { id: number | string }) => {
  return request({
    url: `/bill/detail?id=${params.id}`,
    method: "GET",
  });
};

export const getBillData = (date: string) => {
  const api = `/bill/data?date=${date}`
  return request({
    url: api,
    method: "GET"
  });
};
