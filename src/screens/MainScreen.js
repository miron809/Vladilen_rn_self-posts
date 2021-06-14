import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostList } from '../components/PostList';
import { loadPosts } from '../store/actions/post';
import { screens } from '../navigation/AppNavigation';

export const MainScreen = ({navigation}) => {

  const openPostHandler = (post) => {
    navigation.navigate(screens.post, {post})
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  const allPosts = useSelector(state => state.post.allPosts)

  return <PostList data={allPosts} onOpen={openPostHandler} />
}
