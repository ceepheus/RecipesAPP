import React, {
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
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
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AuthContext from '../../Context/auth';
import logo from '../../Assets/Images/Login/logo.png';
import styles from './Styles';

const Login = ({ navigation }) => {
  const {
    loginContext,
    resetErrors,
    error,
    errorMessage,
    loading,
  } = useContext(AuthContext);

  const refEmail = useRef(null);
  const refPassword = useRef(null);

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
        <Image style={styles.imageLogo} source={logo} />
        {/* <Text style={styles.logo}>Welcome to Recipes APP</Text> */}
        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name="email" size={20} color="#2F2F2F" />
          <TextInput
            ref={refEmail}
            onSubmitEditing={() => refPassword.current.focus()}
            style={styles.inputText}
            placeholder="Email..."
            autoCompleteType="email"
            autoCapitalize="none"
            placeholderTextColor="#C1C1C1"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name="lock" size={20} color="#2F2F2F" />
          <TextInput
            ref={refPassword}
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#C1C1C1"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={btnDisabled ? styles.loginBtnDisabled : styles.loginBtnEnabled}
          onPress={() => { login(); }}
          disabled={btnDisabled}
        >
          {
            loading ? <ActivityIndicator size="small" color="#003f5c" />
              : <Text style={styles.loginButtonText}>Log In</Text>
          }
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateAccount')}
          >
            <Text style={styles.textForgotSignup}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.textForgotSignup}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
