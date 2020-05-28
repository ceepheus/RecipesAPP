import React, { useState, useEffect, useRef } from 'react';
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../Services/Axios/Api';
import styles from './Styles';

const CreateAccount = ({ navigation }) => {
  const refNickname = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refConfirmPassword = useRef(null);

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
      if (err.response.data.errmsg.includes('E-mail has already been used by a google account!')) {
        const msg = 'E-mail has already been used by a google account!';
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
          AlertIOS.alert(msg);
        }
        setLoading(false);
      }
      setLoading(false);
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name="person" size={20} color="#2F2F2F" />
          <TextInput
            ref={refNickname}
            onSubmitEditing={() => refEmail.current.focus()}
            style={styles.inputText}
            placeholder="Nickname..."
            placeholderTextColor="#C1C1C1"
            autoCapitalize="none"
            onChangeText={(text) => setNickname(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name="email" size={20} color="#2F2F2F" />
          <TextInput
            ref={refEmail}
            onSubmitEditing={() => refPassword.current.focus()}
            style={styles.inputText}
            placeholder="Email..."
            autoCompleteType="email"
            placeholderTextColor="#C1C1C1"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name="lock" size={20} color="#2F2F2F" />
          <TextInput
            ref={refPassword}
            onSubmitEditing={() => refConfirmPassword.current.focus()}
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#C1C1C1"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name="lock" size={20} color="#2F2F2F" />
          <TextInput
            ref={refConfirmPassword}
            style={styles.inputText}
            placeholder="Confirm Password..."
            placeholderTextColor="#C1C1C1"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <View style={styles.errorView}>
          {
            isNicknameEmpty
              ? (
                <Text style={styles.text}>
                  {'\u2B24'}
                  {' '}
                  Nickname is required.
                </Text>
              ) : null
          }
          {
            !isEmailValid && isEmailRequired
              ? (
                <Text style={styles.text}>
                  {'\u2B24'}
                  Email Invalid
                </Text>
              ) : null
          }
          {
            !isEmailRequired ? (
              <Text style={styles.text}>
                {'\u2B24'}
                {' '}
                Email is required
              </Text>
            ) : null
          }
          {
            !isPasswordValid && !isPasswordEmpty ? (
              <Text style={styles.text}>
                {'\u2B24'}
                {' '}
                Password and Confirmation must be equal
              </Text>
            ) : null
          }
          {
            !isPasswordLength && !isPasswordEmpty ? (
              <Text style={styles.text}>
                {'\u2B24'}
                {' '}
                The minimum password length is 6
              </Text>
            ) : null
          }
          {
            isPasswordEmpty
              ? (
                <Text style={styles.text}>
                  {'\u2B24'}
                  {' '}
                  Password and confirmation are required
                </Text>
              ) : null
          }
        </View>
        <TouchableOpacity
          style={isBtnDisabled ? styles.btnDisabled : styles.btnEnabled}
          disabled={isBtnDisabled}
          onPress={() => createAccount()}
        >
          {
            loading ? <ActivityIndicator size="small" color="#003f5c" />
              : <Text style={styles.buttonText}>Create</Text>
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

export default CreateAccount;
