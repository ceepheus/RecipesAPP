import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../Services/Axios/Api';

import styles from './Styles';

const ForgotPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    api.post('users/forgotpassword', {
      email,
    }).then(() => {
      navigation.navigate('ChangePassword', { email });
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name="email" size={20} color="#2F2F2F" />
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            autoCompleteType="email"
            autoCapitalize="none"
            placeholderTextColor="#C1C1C1"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.errorView}>
          {
            !isEmailValid && !isEmailEmpty
              ? (
                <Text style={styles.text}>
                  {'\u2B24'}
                  Email Invalid
                </Text>
              ) : null
          }
          {
            isEmailEmpty ? (
              <Text style={styles.text}>
                {'\u2B24'}
                {' '}
                Email is required
              </Text>
            ) : null
          }
        </View>
        <TouchableOpacity
          disabled={isBtnDisabled}
          style={isBtnDisabled ? styles.btnDisabled : styles.btnEnabled}
          onPress={() => sendEmail()}
        >
          {
            loading ? <ActivityIndicator size="small" color="#003f5c" />
              : <Text style={styles.buttonText}>Send Email</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
