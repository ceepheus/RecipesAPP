import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
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
import api from '../Services/Axios/Api';

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
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
    if (!isEmailValid || isEmailEmpty || isPasswordEmpty || loading) {
      setBtnDisabled(true);
      return;
    }
    setBtnDisabled(false);
  }, [isEmailValid, isEmailEmpty, isPasswordEmpty, loading]);

  function login() {
    setLoading(true);
    api.post('users/login', {
      email,
      password,
    }).then((res) => {
      console.log(res.data);
      setLoading(false);
    }).catch((err) => {
      if (err.response.data.msg === 'Access invalid') {
        const msg = 'Invalid login or password';
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
          AlertIOS.alert(msg);
        }
      }
      setLoading(false);
    });
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
        <TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtnEnabled: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  loginBtnDisabled: {
    width: '80%',
    backgroundColor: '#d4807f',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 11,
  },
});

export default Login;
