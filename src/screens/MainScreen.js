import React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { DATA } from '../data';
import { Post } from '../components/Post';

export const MainScreen = ({navigation, route}) => {

  const goToPost = () => {
    navigation.navigate('PostScreen')
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={post => post.id.toString()}
        renderItem={({item}) => <Post post={item} />}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  }
});
