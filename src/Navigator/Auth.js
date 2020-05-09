import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Screens/Login/Login';
import CreateAccount from '../Screens/Login/CreateAccount';
import ForgotPassword from '../Screens/Login/ForgotPassword';

const Stack = createStackNavigator();

function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default Auth;
