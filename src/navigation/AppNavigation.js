import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../theme';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { MainScreen } from '../screens/MainScreen';
import { FavoriteScreen } from '../screens/FavoriteScreen';
import { PostScreen } from '../screens/PostScreen';
import { getCurrentPost, isAndroid } from '../helpers';

const screens = {
  favorite: 'Favorite',
  main: 'Main',
  post: 'Post'
}

const navigatorScreenOptions = {
  gestureEnabled: false,
  headerStyle: {
    backgroundColor: isAndroid() ? THEME.PRIMARY_COLOR : '#fff',
  },
  headerTintColor: isAndroid() ? '#fff' : THEME.PRIMARY_COLOR,
}

const stackScreenOptions = (screen, route) => {
  const options = {
    title: screen
  }

  const headerLeft = () => (
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

  const headerRight = () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title='Take photo'
        iconName='ios-camera'
        onPress={() => {
          console.log('onPress')
        }}
      />
    </HeaderButtons>
  )

  switch (screen) {
    case screens.main:
      return {...options, headerLeft, headerRight};
    case screens.favorite:
      return {...options, headerLeft};
    case screens.post:
      return {title: `Post dated ${new Date(getCurrentPost(route).date).toLocaleDateString()}`}
    default:
      return options;
  }
}

const MainStack = createStackNavigator();
function MainStackScreen() {
  return (
    <MainStack.Navigator screenOptions={navigatorScreenOptions}>
      <MainStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={stackScreenOptions(screens.main)}/>
      <MainStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={({route}) => {
          return (stackScreenOptions(screens.post, route))
        }}
      />
    </MainStack.Navigator>
  )
}

const FavoriteStack = createStackNavigator();
function FavoriteStackScreen() {
  return (
    <FavoriteStack.Navigator screenOptions={navigatorScreenOptions}>
      <FavoriteStack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={stackScreenOptions(screens.favorite)}
      />
      <FavoriteStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={({route}) => {
          return (stackScreenOptions(screens.post, route))
        }}
      />
    </FavoriteStack.Navigator>
  )
}

const Tab = isAndroid() ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={
          {activeTintColor: THEME.PRIMARY_COLOR}
        }
        shifting={true}
        barStyle={{backgroundColor: THEME.PRIMARY_COLOR}}
      >
        <Tab.Screen
          name='Main'
          component={MainStackScreen}
          options={{
            tabBarIcon: ({color}) => (<Ionicons name='ios-albums' size={25} color={color}/>)
          }}
        />
        <Tab.Screen
          name='Favorite'
          component={FavoriteStackScreen}
          options={{
            tabBarIcon: ({color}) => (<Ionicons name='ios-star' size={25} color={color}/>)
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


