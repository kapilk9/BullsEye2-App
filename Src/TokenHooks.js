import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkToken = async key => {
  const data = await AsyncStorage.getItem(key);
  if (data?.length > 0) {
    return true;
  } else {
    return false;
  }
};
export const setToken = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};
export const getToken = async (key) => {
  await AsyncStorage.getItem(key);
};
