import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from "./Navigator";

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  );
};

export default App;
