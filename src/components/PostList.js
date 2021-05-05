import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Post } from './Post';

export const PostList = ({data, onOpen}) => {

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={post => post.id.toString()}
        renderItem={({item}) => <Post post={item} onOpen={onOpen} />}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  }
});
