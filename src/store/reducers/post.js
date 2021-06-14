import { ADD_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_FAVORITE } from '../types';

const initialState = {
  allPosts: [],
  favoritePosts: [],
  loading: true
}

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        allPosts: action.payload,
        favoritePosts: action.payload.filter(post => post.favorite),
        loading: false
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
    case ADD_POST:
      // console.log(action)
      return {
        ...state,
        allPosts: [{...action.payload}, ...state.allPosts]
      }
    default:
      return state
  }
}
