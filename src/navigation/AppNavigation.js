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
import { createDrawerNavigator } from '@react-navigation/drawer';

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

const stackScreenOptions = (screen, route, navigation) => {
  const options = {
    title: screen
  }

  const headerLeft = () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title='Toggle Drawer'
        iconName='ios-menu'
        onPress={() => navigation.openDrawer()}
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
        options={({route, navigation}) => {
          return (stackScreenOptions(screens.main, route, navigation))
        }}
      />
      <MainStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={({route, navigation}) => {
          return (stackScreenOptions(screens.post, route, navigation))
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
        options={({route, navigation}) => {
          return (stackScreenOptions(screens.favorite, route, navigation))
        }}
      />
      <FavoriteStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={({route, navigation}) => {
          return (stackScreenOptions(screens.post, route, navigation))
        }}
      />
    </FavoriteStack.Navigator>
  )
}

const MainBottomTab = isAndroid() ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
function MainBottomTabScreen() {
  return (
    <MainBottomTab.Navigator
      tabBarOptions={
        {activeTintColor: THEME.PRIMARY_COLOR}
      }
      shifting={true}
      barStyle={{backgroundColor: THEME.PRIMARY_COLOR}}
    >
      <MainBottomTab.Screen
        name='Main'
        component={MainStackScreen}
        options={{
          tabBarIcon: ({color}) => (<Ionicons name='ios-albums' size={25} color={color}/>)
        }}
      />
      <MainBottomTab.Screen
        name='Favorite'
        component={FavoriteStackScreen}
        options={{
          tabBarIcon: ({color}) => (<Ionicons name='ios-star' size={25} color={color}/>)
        }}
      />
    </MainBottomTab.Navigator>
  )
}

const DrawerNavigator = createDrawerNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator.Navigator>
        <DrawerNavigator.Screen name='Main' component={MainBottomTabScreen} />
        <DrawerNavigator.Screen name='About' component={MainBottomTabScreen} />
        <DrawerNavigator.Screen name='Create' component={MainBottomTabScreen} />
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
}


