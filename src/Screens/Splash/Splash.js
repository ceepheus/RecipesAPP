import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import styles from './Styles';
import food from '../../Assets/lottie/food.json';

const Splash = () => (
  <View style={styles.container}>
    <LottieView resizeMode="contain" autoSize source={food} autoPlay loop />
    <View style={styles.footer}>
      <Text>
        Powered by
        <Text style={{ fontWeight: 'bold' }}> Cepheus</Text>
      </Text>
    </View>
  </View>
);
export default Splash;
