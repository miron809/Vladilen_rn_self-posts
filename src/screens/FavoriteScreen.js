import React from 'react';
import { useSelector } from 'react-redux';
import { PostList } from '../components/PostList';

export const FavoriteScreen = ({navigation}) => {

  const openPostHandler = (post) => {
    navigation.navigate('PostScreen', {post})
  }

  const favoritePosts = useSelector(state => state.post.favoritePosts)

  return <PostList data={favoritePosts} onOpen={openPostHandler} />
}
