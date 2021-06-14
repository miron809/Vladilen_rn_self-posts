import { ADD_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_FAVORITE } from '../types';
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

export const removePost = id => {
  return {
    type: REMOVE_POST,
    payload: id,
  }
}

export const addPost = post => {
  post.id = Date.now().toString()

  return {
    type: ADD_POST,
    payload: post,
  }
}
