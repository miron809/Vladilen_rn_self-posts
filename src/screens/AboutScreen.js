import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const AboutScreen = ({}) => {

  return (
    <View style={styles.center}>
      <Text>AboutScreen</Text>
      <Text>Version <Text style={styles.version}>1.0.0</Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  version: {
    fontFamily: 'open-bold'
  }
});
