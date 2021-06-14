import { LOAD_POSTS, REMOVE_POST, TOGGLE_FAVORITE } from '../types';

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
    case TOGGLE_FAVORITE:
      const allPosts = state.allPosts.map(post => {
        if (post.id === action.payload) {
          post.favorite = !post.favorite
        }
        return post
      })
      return {
        ...state,
        allPosts,
        favoritePosts: allPosts.filter(post => post.favorite)
      }
    case REMOVE_POST:
      return {
        ...state,
        allPosts: state.allPosts.filter(p => p.id !== action.payload),
        favoritePosts: state.favoritePosts.filter(p => p.id !== action.payload),
      }
    default:
      return state
  }
}
