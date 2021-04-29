import React from 'react';
import { StyleSheet,ScrollView, Alert, View, Text, Image, Button } from 'react-native';
import { DATA } from '../data';
import { THEME } from '../theme';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

export const PostScreen = ({route, navigation}) => {
  const postId = route.params.post.id;
  const post = DATA.find(p => p.id === postId)
  const starButton = post.booked ? 'ios-star' : 'ios-star-outline'

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title='Favorite'
            iconName={starButton}
            onPress={() => {
              console.log('onPress')
            }}
          />
        </HeaderButtons>
      )
    });
  }, [navigation]);

  const removeHandler = () => {
    Alert.alert(
      "Delete post",
      "Are you sure?",
      [
        { text: "Cancel" },
        {
          text: "OK",
          onPress: () => console.log("OK Pressed")
        }
      ]
    );
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
