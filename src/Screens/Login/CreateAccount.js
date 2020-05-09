import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  ToastAndroid,
  AlertIOS,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import api from '../../Services/Axios/Api';

import styles from './Styles';

const CreateAccount = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isNicknameEmpty, setIsNicknameEmpty] = useState(true);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailRequired, setIsEmailRequired] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordLength, setIsPasswordLength] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  useEffect(() => {
    if (email.trim() !== '') {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      setIsEmailValid(re.test(email.trim()));
      setIsEmailRequired(true);
      return;
    }
    if (email.trim() === '') {
      setIsEmailRequired(false);
    }
  }, [email]);

  useEffect(() => {
    if (nickname.trim() === '') {
      setIsNicknameEmpty(true);
      return;
    }
    setIsNicknameEmpty(false);
  }, [nickname]);

  useEffect(() => {
    if (password.trim() === '' || confirmPassword.trim() === '') {
      setIsPasswordEmpty(true);
      return;
    }
    if (password.trim() !== '' || confirmPassword.trim() !== '') {
      setIsPasswordEmpty(false);
      if (password.trim().length < 6 || confirmPassword.trim().length < 6) {
        setIsPasswordLength(false);
        return;
      }
      if (password.trim() !== confirmPassword.trim()) {
        setIsPasswordValid(false);
        return;
      }
      setIsPasswordLength(true);
      setIsPasswordValid(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (isNicknameEmpty
      || !isEmailValid
      || isPasswordEmpty
      || !isPasswordLength
      || !isPasswordValid
      || loading) {
      setIsBtnDisabled(true);
      return;
    }
    setIsBtnDisabled(false);
  }, [isNicknameEmpty, isEmailValid, isPasswordEmpty, isPasswordLength, isPasswordValid, loading]);

  function createAccount() {
    setLoading(true);
    api.post('users/create', {
      nickname,
      email,
      password,
    }).then(() => {
      const msg = 'Account has been created!';
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
      } else {
        AlertIOS.alert(msg);
      }
      navigation.goBack();
      setLoading(false);
    }).catch((err) => {
      if (err.response.data.errmsg.includes('duplicate key')) {
        const msg = 'E-mail has already been taken';
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
          AlertIOS.alert(msg);
        }
        setLoading(false);
      }
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
            placeholder="Nickname..."
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            onChangeText={(text) => setNickname(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Confirm Password..."
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <View style={styles.errorView}>
          {
            isNicknameEmpty
              ? (
                <Text style={styles.errorMessage}>
                  {'\u2B24'}
                  {' '}
                  Nickname is required.
                </Text>
              ) : null
          }
          {
            !isEmailValid && isEmailRequired
              ? (
                <Text style={styles.errorMessage}>
                  {'\u2B24'}
                  Email Invalid
                </Text>
              ) : null
          }
          {
            !isEmailRequired ? (
              <Text style={styles.errorMessage}>
                {'\u2B24'}
                {' '}
                Email is required
              </Text>
            ) : null
          }
          {
            !isPasswordValid && !isPasswordEmpty ? (
              <Text style={styles.errorMessage}>
                {'\u2B24'}
                {' '}
                Password and Confirmation must be equal
              </Text>
            ) : null
          }
          {
            !isPasswordLength && !isPasswordEmpty ? (
              <Text style={styles.errorMessage}>
                {'\u2B24'}
                {' '}
                The minimum password length is 6
              </Text>
            ) : null
          }
          {
            isPasswordEmpty
              ? (
                <Text style={styles.errorMessage}>
                  {'\u2B24'}
                  {' '}
                  Password and confirmation are required
                </Text>
              ) : null
          }
        </View>
        <TouchableOpacity
          style={isBtnDisabled ? styles.createBtnDisabled : styles.createBtnEnabled}
          disabled={isBtnDisabled}
          onPress={() => createAccount()}
        >
          {
            loading ? <ActivityIndicator size="small" color="#003f5c" />
              : <Text style={styles.createText}>CREATE</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.createText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccount;
