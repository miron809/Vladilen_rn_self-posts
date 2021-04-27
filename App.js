import React, { useState } from 'react';
import { Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { bootstrap } from './src/bootstrap';

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return <AppLoading
      startAsync={bootstrap}
      onFinish={() => setIsReady(true)}
      onError={err => console.log(err)}
    />
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
