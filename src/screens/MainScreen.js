import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PostList } from '../components/PostList';
import { loadPosts } from '../store/actions/post';
import { screens } from '../navigation/AppNavigation';
import { THEME } from '../theme';

export const MainScreen = ({navigation}) => {

  const openPostHandler = (post) => {
    navigation.navigate(screens.post, {post})
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  const allPosts = useSelector(state => state.post.allPosts)
  const loading = useSelector(state => state.post.loading)

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.PRIMARY_COLOR}/>
      </View>
    )
  }

  return <PostList data={allPosts} onOpen={openPostHandler}/>
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
