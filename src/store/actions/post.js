import { LOAD_POSTS, TOGGLE_FAVORITE } from '../types';
import { DATA } from '../../data';

export const loadPosts = () => {
  return {
    type: LOAD_POSTS,
    payload: DATA
  }
}

export const toggleFavorite = id => {
  return {
    type: TOGGLE_FAVORITE,
    payload: id,
  }
}
