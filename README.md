<!--
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 1985-10-26 16:15:00
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-01-25 19:13:42
 * @FilePath: /jue-note/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## 记账本 APP 开发记录
- [x] 项目初始化，引入`Nativewind`，构建底部导航栏
- [x] 引入`react-query` + `axios`，二次封装请求库
- [x] 引入`zustand`，构建全局状态管理
- [x] 通过`expo-linear-gradient`引入渐变组件`LinearGradient`
- [x] 通过`react-native-safe-area-context`引入安全区域方法`useSafeAreaInsets`
- [x] 完成登录页面
- [x] 个人中心页面顶部状态栏单独设置，通过`useFocusEffect`结合`StatusBar`实现进入时背景为蓝色，离开时恢复默认