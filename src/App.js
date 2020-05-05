import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import Login from "./Screens/Login";

const App= () => {
  return (
    <>
      <Login/>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1
  }
});

export default App;
