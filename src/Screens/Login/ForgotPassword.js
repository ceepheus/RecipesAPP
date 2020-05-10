import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import api from '../../Services/Axios/Api';

import styles from './Styles';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  useEffect(() => {
    if (email.trim() !== '') {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      setIsEmailValid(re.test(email.trim()));
      setIsEmailEmpty(false);
      return;
    }
    if (email.trim() === '') {
      setIsEmailEmpty(true);
    }
  }, [email]);

  useEffect(() => {
    if (isEmailEmpty
      || !isEmailValid) {
      setIsBtnDisabled(true);
      return;
    }
    setIsBtnDisabled(false);
  }, [isEmailEmpty, isEmailValid]);

  function sendEmail() {
    api.post('users/forgotpassword', {
      email,
    }).then(() => {
      navigation.navigate('ChangePassword', { email });
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            autoCompleteType="email"
            autoCapitalize="none"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.errorView}>
          {
            !isEmailValid && !isEmailEmpty
              ? (
                <Text style={styles.errorMessage}>
                  {'\u2B24'}
                  Email Invalid
                </Text>
              ) : null
          }
          {
            isEmailEmpty ? (
              <Text style={styles.errorMessage}>
                {'\u2B24'}
                {' '}
                Email is required
              </Text>
            ) : null
          }
        </View>
        <TouchableOpacity
          disabled={isBtnDisabled}
          style={isBtnDisabled ? styles.loginBtnDisabled : styles.loginBtnEnabled}
          onPress={() => sendEmail()}
        >
          <Text style={styles.sendText}>Send Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.sendText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
