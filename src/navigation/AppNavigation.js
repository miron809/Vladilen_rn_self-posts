import React from 'react';
import { Platform } from 'react-native';
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

const isAndroid = () => {
  return Platform.OS === 'android'
}

const generalScreenOptions = {
  gestureEnabled: false,
  headerStyle: {
    backgroundColor: isAndroid() ? THEME.PRIMARY_COLOR : '#fff',
  },
  headerTintColor: isAndroid() ? '#fff' : THEME.PRIMARY_COLOR,
}

const iOsTabBarOptions = {
  activeTintColor: THEME.PRIMARY_COLOR,
}

const androidTabBarOptions = {
  // labeled: false,
  // barStyle = {{backgroundColor: THEME.PRIMARY_COLOR}}
}

const MainStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName="Main"
      screenOptions={generalScreenOptions}>
      <MainStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: 'MainScreen',
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
      <MainStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={({route}) => {
          const date = route.params.post.date;
          return ({
            title: `Post dated ${new Date(date).toLocaleDateString()}`
          })
        }}
      />
    </MainStack.Navigator>
  )
}

const FavoriteStack = createStackNavigator();

function FavoriteStackScreen() {
  return (
    <FavoriteStack.Navigator
      initialRouteName="Main"
      screenOptions={generalScreenOptions}>
      <FavoriteStack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          title: 'Favorite',
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
      <FavoriteStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={({route}) => {
          const date = route.params.post.date;
          return ({
            title: `Post dated ${new Date(date).toLocaleDateString()}`
          })
        }}
      />
    </FavoriteStack.Navigator>
  )
}

const Tab = isAndroid() ? createBottomTabNavigator() : createBottomTabNavigator();
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
        <Tab.Screen name='Main' component={MainStackScreen}
                    options={{
                      tabBarIcon: ({color}) => (<Ionicons name='ios-albums' size={25} color={color}/>)
                    }}
        />
        <Tab.Screen name='Favorite' component={FavoriteStackScreen}
                    options={{
                      tabBarIcon: ({color}) => (<Ionicons name='ios-star' size={25} color={color}/>)
                    }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


