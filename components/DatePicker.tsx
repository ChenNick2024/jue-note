import React from 'react';
import { View, Text, Modal, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';  // 导入中文语言包

interface DatePickerProps {
  show: boolean;
  date: Date;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

const DatePicker = ({ show, date, onConfirm, onCancel }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = React.useState(date);

  const handleChange = (_: any, selected: Date | undefined) => {
    if (selected) {
      setSelectedDate(selected);
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedDate);
  };

  if (Platform.OS === 'ios') {
    return (
      <Modal
        visible={show}
        transparent
        animationType="slide"
      >
        <Pressable 
          className="flex-1 bg-black/30 justify-end"
          onPress={onCancel}
        >
          <Pressable className="bg-white rounded-t-2xl">
            <View className="flex-row items-center justify-between px-8 h-14 border-b border-gray-100">
              <Pressable 
                onPress={onCancel}
                className="h-full justify-center px-4"
              >
                <Text className="text-gray-400 text-base">取消</Text>
              </Pressable>
              <Text className="text-base font-medium">选择日期</Text>
              <Pressable 
                onPress={handleConfirm}
                className="h-full justify-center px-4"
              >
                <Text className="text-primary-300 text-base font-medium">确定</Text>
              </Pressable>
            </View>
            <View className="w-full items-center justify-center">
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={handleChange}
                textColor="#000"
                locale="zh-CN"
                style={{
                  width: Platform.OS === 'ios' ? '90%' : undefined,
                  height: 200,
                  marginHorizontal: -20,
                }}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    );
  }

  return show ? (
    <DateTimePicker
      value={selectedDate}
      mode="date"
      display="default"
      onChange={(_, date) => {
        if (date) {
          onConfirm(date);
        } else {
          onCancel();
        }
      }}
      locale="zh-CN"  // Android 也添加中文设置
    />
  ) : null;
};

export default DatePicker; 