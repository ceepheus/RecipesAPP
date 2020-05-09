import React, { useContext } from 'react';
import { View, Button } from 'react-native';

import AuthContext from '../../Context/auth';

const Home = () => {
  const { logoutContext } = useContext(AuthContext);

  return (
    <View>
      <Button
        title="Deslogar"
        onPress={() => {
          logoutContext();
        }}
      />
    </View>
  );
};

export default Home;
