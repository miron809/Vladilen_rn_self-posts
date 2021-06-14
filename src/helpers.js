import { Platform } from 'react-native';

export const isAndroid = () => {
  return Platform.OS === 'android'
}

export const getCurrentPost = (route) => {
  return route.params.post;
}
