import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import useRootStore from "@/store/rootStore";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { logState } from "@/utils/tool";
const Mine = () => {
  const { clearToken, clearUserInfo, userInfo } = useRootStore();
  useEffect(() => {
    logState('rootStore');
  }, []);
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text>{userInfo?.username ?? '--'}</Text>
      <Button title="退出登录" onPress={() => {
        clearToken();
        clearUserInfo();
        router.replace("/login");
      }} />
    </SafeAreaView>
  );
};

export default Mine;
