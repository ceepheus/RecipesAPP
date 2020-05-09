import React, { useContext } from 'react';
import AuthRoute from './Auth';

import AuthContext from '../Context/auth';

import Home from '../Screens/Home/Home';
import Splash from '../Screens/Splash/Splash';

const Index = () => {
  const { signed, splashScreen } = useContext(AuthContext);

  function getScreen() {
    if (splashScreen) {
      return <Splash />;
    }
    if (signed) {
      return <Home />;
    }
    return <AuthRoute />;
  }

  return (
    getScreen()
  );
};

export default Index;
