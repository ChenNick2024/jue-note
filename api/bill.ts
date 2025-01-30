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