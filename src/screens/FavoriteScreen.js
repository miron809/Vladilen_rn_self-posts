import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { DATA } from '../data';
import { Post } from '../components/Post';

export const FavoriteScreen = ({navigation}) => {

  const openPostHandler = (post) => {
    navigation.navigate('PostScreen', {post})
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={DATA.filter(post => post.favorite)}
        keyExtractor={post => post.id.toString()}
        renderItem={({item}) => <Post post={item} onOpen={openPostHandler} />}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  }
});
