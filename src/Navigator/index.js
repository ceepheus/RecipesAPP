import React, { useContext } from 'react';
import AuthRoute from './Auth';
import AppRoute from './App';

import AuthContext from '../Context/auth';

import Splash from '../Screens/Splash/Splash';

const Index = () => {
  const { signed, splashScreen } = useContext(AuthContext);

  function getScreen() {
    if (splashScreen) {
      return <Splash />;
    }
    if (signed) {
      return <AppRoute />;
    }
    return <AuthRoute />;
  }

  return (
    getScreen()
  );
};

export default Index;
