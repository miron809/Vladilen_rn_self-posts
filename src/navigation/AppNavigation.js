import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { THEME } from '../theme';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

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
          options={{
            title: 'MainScreen title',
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                  title='Take photo'
                  iconName='ios-camera'
                  onPress={() => {
                    console.log('onPress')
                  }}
                />
              </HeaderButtons>
            ),
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                  title='Toggle Drawer'
                  iconName='ios-menu'
                  onPress={() => {
                    console.log('onPress')
                  }}
                />
              </HeaderButtons>
            )
          }}
        />
        <Stack.Screen
          name="PostScreen"
          component={PostScreen}
          options={({route}) => {
            const date = route.params.post.date;
            return ({
              title: `Post dated ${new Date(date).toLocaleDateString()}`
            })
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
