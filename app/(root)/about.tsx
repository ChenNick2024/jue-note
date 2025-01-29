/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-28 11:57:55
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-28 11:58:38
 * @FilePath: /jue-note/app/(root)/about.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Text, View, SafeAreaView } from 'react-native';

const About = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <Text className="text-2xl font-bold">关于</Text>
      </View>
    </SafeAreaView>
  );
}

export default About;
