/*
 * @Author: 陈尼克 xianyou1993@qq.com
 * @Date: 2025-01-23 16:35:19
 * @LastEditors: 陈尼克 xianyou1993@qq.com
 * @LastEditTime: 2025-02-03 16:29:39
 * @FilePath: /jue-note/app/(root)/(tabs)/data.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import { useFocusEffect } from "expo-router";
import { useEffect, useCallback, useState, useRef } from "react";
import useRootStore from "@/store/rootStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { getBillData } from "@/api/bill";
import dayjs from 'dayjs';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { DatePicker } from '@fruits-chain/react-native-xiaoshu';
import { calendar } from "@/constants/image";

const COLORS = ['#177AD5', '#79D2DE', '#ED6665', '#FF9F43', '#FFD700', '#FF6B6B', '#9467BD', '#2ECC71', '#1F77B4', '#FF7F50'];
const E_HEIGHT = 300;
const E_WIDTH = Dimensions.get('screen').width - 32; // 减去左右padding的16px

interface BillDataItem {
  type_name: string;
  number: number;
  pay_type: number;
}

interface BillResponse {
  data: {
    total_expense: number;
    total_income: number;
    total_data: BillDataItem[];
  }
}

// 注册必要的组件
echarts.use([
  SVGRenderer,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
]);

const Data = () => {
  const { setCurrentTab } = useRootStore();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [type, setType] = useState(1);
  const [date, setDate] = useState(dayjs().format('YYYY-MM'));
  const svgRef = useRef(null);

  useEffect(() => {
    let chart: any;
    
    const fetchData = async () => {
      const res = await getBillData(date);
      const { total_expense, total_income, total_data } = res.data;
      setTotalExpense(total_expense);
      setTotalIncome(total_income);
      
      // 处理饼图数据
      const filteredData = total_data
        .filter((item: BillDataItem) => item.pay_type == type)
        .map((item: BillDataItem, index: number) => ({
          name: item.type_name,
          value: Number(item.number),
          itemStyle: {
            color: COLORS[index % COLORS.length]
          }
        }));

      if (svgRef.current) {
        // 初始化图表
        chart = echarts.init(svgRef.current, 'light', {
          renderer: 'svg',
          width: E_WIDTH,
          height: E_HEIGHT
        });

        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            right: '5%',
            top: 'middle',
            textStyle: {
              color: '#666'
            }
          },
          series: [
            {
              name: type === 1 ? '支出构成' : '收入构成',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['40%', '50%'],
              avoidLabelOverlap: true,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'inner',
                formatter: (params: any) => {
                  // 计算总和
                  const total = filteredData.reduce((sum, item) => sum + item.value, 0);
                  // 计算百分比
                  const percent = ((params.value / total) * 100).toFixed(0);
                  // 如果占比太小，不显示标签
                  return percent > 5 ? `¥${params.value}` : '';
                },
                fontSize: 14,
                fontWeight: 'bold',
                color: '#fff',
                lineHeight: 12
              },
              emphasis: {
                itemStyle: {
                  borderWidth: 3,
                  borderColor: '#fff',
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.2)'
                }
              },
              labelLine: {
                show: false
              },
              data: filteredData
            }
          ]
        };

        chart.setOption(option);
      }
    };

    fetchData();

    // 清理函数
    return () => {
      chart?.dispose();
    };
  }, [type, date]);

  useFocusEffect(
    useCallback(() => {
      setCurrentTab('data');
    }, [])
  );

  const handleSelectMonth = () => {
    DatePicker({
      title: '选择月份',
      mode: 'Y-M',
      value: dayjs(date).toDate(),
    }).then(({ action, value }) => {
      if (action === 'confirm') {
        setDate(dayjs(value).format('YYYY-MM'));
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        <View className="flex-row items-center justify-center py-4">
          <Text className="text-xl font-bold">数据统计</Text>
        </View>
        
        <TouchableOpacity 
          onPress={handleSelectMonth}
          className="flex-row items-center justify-center mb-4 bg-gray-50 py-2 rounded-full w-[140] m-auto"
        >
          <Text className="text-base">{dayjs(date).format('YYYY年MM月')}</Text>
          <Image source={calendar} className="size-5" />
        </TouchableOpacity>

        <View className="flex-row items-center justify-center mb-6">
          <TouchableOpacity 
            className={`px-4 py-2 rounded-full ${type === 1 ? 'bg-blue-50' : ''}`} 
            onPress={() => setType(1)}
          >
            <Text className={`text-lg font-medium ${type === 1 ? 'text-blue-500' : 'text-gray-500'}`}>
              支出
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`px-4 py-2 rounded-full ${type === 2 ? 'bg-orange-50' : ''}`}
            onPress={() => setType(2)}
          >
            <Text className={`text-lg font-medium ${type === 2 ? 'text-[#FFA238]' : 'text-gray-500'}`}>
              收入
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mb-6 gap-[50]">
          <View className="flex-col items-center">
            <Text className="text-black-300 mb-1">总支出</Text>
            <Text className="text-xl font-bold text-green-500">¥{totalExpense}</Text>
          </View>
          <View className="flex-col items-center">
            <Text className="text-black-300 mb-1">总收入</Text>
            <Text className="text-xl font-bold text-red-500">¥{totalIncome}</Text>
          </View>
        </View>
        
        <View className="flex-1 items-center">
          <SvgChart ref={svgRef} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Data;
