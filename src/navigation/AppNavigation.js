import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { THEME } from '../theme';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { MainScreen } from '../screens/MainScreen';
import { FavoriteScreen } from '../screens/FavoriteScreen';
import { PostScreen } from '../screens/PostScreen';
import { getCurrentPost, isAndroid } from '../helpers';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';

export const screens = {
  favorite: 'Favorite',
  main: 'Main',
  post: 'Post',
  about: 'About',
  create: 'Create'
}

const stackNavigatorOptions = {
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
        onPress={() => navigation.navigate(screens.create)}
      />
    </HeaderButtons>
  )

  switch (screen) {
    case screens.main:
      return {...options, headerLeft, headerRight};
    case screens.favorite:
      return {...options, headerLeft};
    case screens.post:
      return {title: `Post dated ${new Date(getCurrentPost(route).date).toLocaleDateString()}`};
    case screens.about:
      return {...options, headerLeft};
    case screens.create:
      return {...options, headerLeft};
    default:
      return options;
  }
}

const MainStack = createStackNavigator();
function MainStackScreen() {
  return (
    <MainStack.Navigator screenOptions={stackNavigatorOptions}>
      <MainStack.Screen
        name={screens.main}
        component={MainScreen}
        options={({route, navigation}) => {
          return (stackScreenOptions(screens.main, route, navigation))
        }}
      />
      <MainStack.Screen
        name={screens.post}
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
    <FavoriteStack.Navigator screenOptions={stackNavigatorOptions}>
      <FavoriteStack.Screen
        name={screens.favorite}
        component={FavoriteScreen}
        options={({route, navigation}) => {
          return (stackScreenOptions(screens.favorite, route, navigation))
        }}
      />
      <FavoriteStack.Screen
        name={screens.post}
        component={PostScreen}
        options={({route, navigation}) => {
          return (stackScreenOptions(screens.post, route, navigation))
        }}
      />
    </FavoriteStack.Navigator>
  )
}

const AboutStack = createStackNavigator();
function AboutStackScreen() {
  return (
    <AboutStack.Navigator screenOptions={stackNavigatorOptions}>
      <AboutStack.Screen
        name={screens.about}
        component={AboutScreen}
        options={({route, navigation}) => {
          return (stackScreenOptions(screens.about, route, navigation))
        }}
      />
    </AboutStack.Navigator>
  )
}

const CreateStack = createStackNavigator();
function CreateStackScreen() {
  return (
    <CreateStack.Navigator screenOptions={stackNavigatorOptions}>
      <CreateStack.Screen
        name={screens.create}
        component={CreateScreen}
        options={({route, navigation}) => {
          return (stackScreenOptions(screens.create, route, navigation))
        }}
      />
    </CreateStack.Navigator>
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
        name={screens.main}
        component={MainStackScreen}
        options={{
          tabBarIcon: ({color}) => (<Ionicons name='ios-albums' size={25} color={color}/>)
        }}
      />
      <MainBottomTab.Screen
        name={screens.favorite}
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
      <DrawerNavigator.Navigator drawerContentOptions={{
        activeTintColor: THEME.PRIMARY_COLOR,
        labelStyle: {
          fontFamily: 'open-bold'
        }
      }}>
        <DrawerNavigator.Screen
          name={screens.main}
          component={MainBottomTabScreen}
        />
        <DrawerNavigator.Screen name={screens.about} component={AboutStackScreen} />
        <DrawerNavigator.Screen name={screens.create} component={CreateStackScreen} />
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
}


