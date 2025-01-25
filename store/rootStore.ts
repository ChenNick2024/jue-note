/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-25 10:31:41
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-25 10:35:36
 * @FilePath: /jue-note/store/rootStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware"

interface AppState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
  clearUserInfo: () => void;
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
    }),
    {
      name: "rootStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useRootStore;
