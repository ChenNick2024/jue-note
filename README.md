<!--
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 1985-10-26 16:15:00
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-02-02 21:13:52
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
- [x] 打包成apk后，安装到手机上运行，接口必须支持HTTPS，所以笔者给接口加了证书😂，整了一上午
- [x] 将底部`Tabs`记住点击的位置，返回的时候还在上一次的`Tab`
- [x] 引入`expo-image-picker`插件，实现头像上传
- [x] `app.json`修改`App`的图标
- [x] 优化首页时间选择器，原生的UI不统一，这边通过[小暑组件库]([text](https://24jieqi.github.io/react-native-xiaoshu))提供的`DatePicker`组件美化一下，后续可以使用组件库内提供的其他组件，更新一下UI
- [x] 完成添加账单的Popup，这边使用的是[小暑组件库]([text](https://24jieqi.github.io/react-native-xiaoshu))提供的`Popup`组件
- [x] 添加详情页，抽离出`AddPopup`组件，通过`id`来判断是添加还是编辑
- [x] 抽离类型数据到全局状态里。