import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ToastAndroid,
  AlertIOS,
  ActivityIndicator,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import AuthContext from '../../Context/auth';

import styles from './Styles';

const Login = ({ navigation }) => {
  const {
    loginContext,
    resetErrors,
    error,
    errorMessage,
    loading,
  } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [password, setPassword] = useState('');
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);

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
    if (password.trim() === '') {
      setIsPasswordEmpty(true);
      return;
    }

    setIsPasswordEmpty(false);
  }, [password]);

  useEffect(() => {
    if (error) {
      if (errorMessage === 'Access invalid') {
        const msg = 'Invalid login or password';
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
          AlertIOS.alert(msg);
        }
        resetErrors();
      }
    }
  }, [error, errorMessage]);

  useEffect(() => {
    if (!isEmailValid || isEmailEmpty || isPasswordEmpty || loading) {
      setBtnDisabled(true);
      return;
    }
    setBtnDisabled(false);
  }, [isEmailValid, isEmailEmpty, isPasswordEmpty, loading]);

  function login() {
    loginContext(email, password);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <Text style={styles.logo}>Recipes APP</Text>
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
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={btnDisabled ? styles.loginBtnDisabled : styles.loginBtnEnabled}
          onPress={() => { login(); }}
          disabled={btnDisabled}
        >
          {
            loading ? <ActivityIndicator size="small" color="#003f5c" />
              : <Text style={styles.loginText}>LOGIN</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateAccount')}
        >
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
