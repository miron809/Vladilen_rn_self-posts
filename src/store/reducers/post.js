import { LOAD_POSTS } from '../types';

const initialState = {
  allPosts: [],
  favoritePosts: []
}

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        allPosts: action.payload,
        favoritePosts: action.payload.filter(post => post.favorite)
      }
    default:
      return state
  }
}
