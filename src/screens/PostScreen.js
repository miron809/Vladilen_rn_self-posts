import React, { useCallback, useEffect } from 'react';
import { StyleSheet,ScrollView, Alert, View, Text, Image, Button } from 'react-native';
import { THEME } from '../theme';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { getCurrentPost } from '../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { removePost, toggleFavorite } from '../store/actions/post';
import { screens } from '../navigation/AppNavigation';

export const PostScreen = ({route, navigation}) => {
  const post = getCurrentPost(route);

  const isFavorite = useSelector(state => {
    return state.post.favoritePosts.some(p => p.id === post.id)
  })

  const starButton = isFavorite ? 'ios-star' : 'ios-star-outline'

  const dispatch = useDispatch();

  const toggleHandler = useCallback(() => {
    dispatch(toggleFavorite(post))
  }, [dispatch, post])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title='Favorite'
            iconName={starButton}
            onPress={() => toggleHandler()}
          />
        </HeaderButtons>
      )
    });
  }, [navigation, isFavorite]);

  const removeHandler = () => {
    Alert.alert(
      "Delete post",
      "Are you sure?",
      [
        { text: "Cancel" },
        {
          text: "OK",
          onPress() {
            navigation.navigate(screens.main)
            dispatch(removePost(post.id))
          }
        }
      ]
    );
  }

  if (!post) {
    return null;
  }

  return (
    <ScrollView style={styles.center}>
      <Image
        source={{uri: post.img}}
        style={styles.image}
      />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        onPress={removeHandler}
        title='remove'
        color={THEME.DANGER_COLOR} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: 'open-regular'
  }
});
