/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDrawerContent from './CustomDrawers/CustomDrawerContent';

import Home from '../Screens/Home/Home';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home-account'
              : 'home';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#00AAAB',
        inactiveTintColor: '#3CDECE',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Início" component={BottomNavigator} />
    </Drawer.Navigator>
  );
}

export default App;
