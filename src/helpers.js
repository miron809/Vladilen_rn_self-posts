import { Platform } from 'react-native';
import { DATA } from './data';

export const isAndroid = () => {
  return Platform.OS === 'android'
}

export const getCurrentPost = (route) => {
  const postId = route.params.post.id;
  return DATA.find(p => p.id === postId)
}
