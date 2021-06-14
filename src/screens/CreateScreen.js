import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { THEME } from '../theme';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/actions/post';
import { screens } from '../navigation/AppNavigation';

export const CreateScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('')
  const img = 'https://cdn.shopify.com/s/files/1/0286/9208/6863/products/eaas_nano_clearcola_1200_ns_e96c5cbc-ae26-48ea-84cc-3f00a5865afb_600x600.png?v=1586813490';

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text,
      img,
      favorite: false
    }
    dispatch(addPost(post))
    navigation.navigate(screens.main)
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create new post</Text>
          <TextInput
            style={styles.textarea}
            placeholder='Enter your text'
            value={text}
            onChangeText={setText}
            multiline
          />
          <Image
            source={{uri: img}}
            style={{width: '100%', height: 200, marginBottom: 10}}
          />
          <Button
            title='Create post'
            color={THEME.PRIMARY_COLOR}
            onPress={saveHandler}/>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10
  },
  textarea: {
    padding: 10,
    marginBottom: 10
  }
})

