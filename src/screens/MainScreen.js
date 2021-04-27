import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export const MainScreen = ({navigation, route}) => {

  const goToPost = () => {
    navigation.navigate('PostScreen')
  }

  return (
    <View style={styles.center}>
      <Text>MainScreen</Text>
      <Button title="go to post" onPress={goToPost} />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
