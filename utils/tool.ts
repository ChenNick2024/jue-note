import AsyncStorage from '@react-native-async-storage/async-storage';

const logState = async (key: string) => {
  try {
    const root = await AsyncStorage.getItem(key);
    if (root) {
      console.log(JSON.parse(root));
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  logState
};