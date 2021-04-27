import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { THEME } from '../theme';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.PRIMARY_COLOR : '#fff',
          },
          headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.PRIMARY_COLOR,
        }}
      >
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ title: 'MainScreen title' }}
        />
        <Stack.Screen
          name="PostScreen"
          component={PostScreen}
          initialParams={{ title: 'PostScreen title' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



// export const AppNavigation = NavigationContainer(PostNavigator)
