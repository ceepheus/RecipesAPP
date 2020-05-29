/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AuthContext from '../../Context/auth';

function CustomDrawerContent(props) {
  const { logoutContext } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Deslogar"
        onPress={() => {
          logoutContext();
        }}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;