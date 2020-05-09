import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Screens/Home/Home';

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default App;
