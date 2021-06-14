import React, { useRef, useState } from 'react';
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
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('')
  const imgRef = useRef()

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text,
      img: imgRef.current,
      favorite: false
    }
    dispatch(addPost(post))
    navigation.navigate(screens.main)
  }

  const photoPickHandler = (uri) => {
    imgRef.current = uri;
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
          <PhotoPicker onPick={photoPickHandler} />
          <Button
            title='Create post'
            color={THEME.PRIMARY_COLOR}
            onPress={saveHandler}
            disabled={!text}
          />
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

