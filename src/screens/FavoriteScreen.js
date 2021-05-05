import React from 'react';
import { DATA } from '../data';
import { PostList } from '../components/PostList';

export const FavoriteScreen = ({navigation}) => {

  const openPostHandler = (post) => {
    navigation.navigate('PostScreen', {post})
  }

  const data = DATA.filter(post => post.favorite);

  return <PostList data={data} onOpen={openPostHandler} />
}
