import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

import styles from './Styles';
import food from '../../Assets/lottie/food.json';

const Splash = () => (
  <View style={styles.container}>
    <LottieView resizeMode="contain" autoSize source={food} autoPlay loop />
  </View>
);

export default Splash;
