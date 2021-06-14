import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Post } from './Post';

export const PostList = ({data, onOpen}) => {

  if (!data.length) {
    return <View style={styles.container}><Text style={styles.noItems}>No items</Text></View>
  }

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
  },
  noItems: {
    fontFamily: 'open-regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18
  }
});
