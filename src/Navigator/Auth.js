import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Screens/Login';
import CreateAccount from '../Screens/CreateAccount';

const Stack = createStackNavigator();

function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default Auth;
