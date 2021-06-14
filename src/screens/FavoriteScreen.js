import React from 'react';
import { useSelector } from 'react-redux';
import { PostList } from '../components/PostList';
import { screens } from '../navigation/AppNavigation';

export const FavoriteScreen = ({navigation}) => {

  const openPostHandler = (post) => {
    navigation.navigate(screens.post, {post})
  }

  const favoritePosts = useSelector(state => state.post.favoritePosts)

  return <PostList data={favoritePosts} onOpen={openPostHandler} />
}
