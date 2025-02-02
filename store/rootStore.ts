/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-25 10:31:41
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-02-02 21:07:55
 * @FilePath: /jue-note/store/rootStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware"
import { getUserInfo } from "@/api/user";
import { getBillTypeList } from "@/api/bill";

interface AppState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
  clearUserInfo: () => void;
  updateUserInfo: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  typeList: any[];
  typeListAll: any[];
  initTypeList: () => void;
}

const useRootStore = create<AppState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: null }),
      userInfo: {},
      setUserInfo: (userInfo: any) => set({ userInfo }),
      clearUserInfo: () => set({ userInfo: {} }),
      updateUserInfo: (): void => {
        getUserInfo().then((res) => {
          set({ userInfo: res.data });
        });
      },
      currentTab: 'index',
      setCurrentTab: (tab: string) => set({ currentTab: tab }),
      typeList: [],
      typeListAll: [],
      initTypeList: (): void => {
        getBillTypeList().then((res) => {
          set({
            typeListAll: [{ label: '全部', value: 'all' }].concat(res.data.list.map((item: any) => ({ label: item.name, value: item.id, id: item.id }))),
            typeList: res.data.list.map((item: any) => ({ label: item.name, value: item.id, id: item.id }))
          });
        });
      },
    }),
    {
      name: "rootStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useRootStore;
