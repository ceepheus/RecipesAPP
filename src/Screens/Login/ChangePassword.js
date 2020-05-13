import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../Services/Axios/Api';

import styles from './Styles';

const ChangePassword = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [secretToken, setSecretToken] = useState('');
  const [isSecretEmpty, setIsSecretEmpty] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordLength, setIsPasswordLength] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [isSecretValid, setIsSecretValid] = useState(true);
  const [requestNewToken, setRequestNewToken] = useState(false);

  useEffect(() => {
    if (newPassword.trim() === '' || confirmNewPassword.trim() === '') {
      setIsPasswordEmpty(true);
      return;
    }
    if (newPassword.trim() !== '' || confirmNewPassword.trim() !== '') {
      setIsPasswordEmpty(false);
      if (newPassword.trim().length < 6 || confirmNewPassword.trim().length < 6) {
        setIsPasswordLength(false);
        return;
      }
      if (newPassword.trim() !== confirmNewPassword.trim()) {
        setIsPasswordValid(false);
        return;
      }
      setIsPasswordLength(true);
      setIsPasswordValid(true);
      setIsBtnDisabled(false);
    }
  }, [newPassword, confirmNewPassword]);

  useEffect(() => {
    if (secretToken.trim() === '') {
      setIsSecretEmpty(true);
      return;
    }
    setIsSecretEmpty(false);
  }, [secretToken]);

  useEffect(() => {
    if (isSecretEmpty
      || isPasswordEmpty
      || !isPasswordLength
      || !isPasswordValid
      || loading) {
      setIsBtnDisabled(true);
      return;
    }
    setIsBtnDisabled(false);
  }, [isSecretEmpty, isPasswordEmpty, isPasswordLength, isPasswordValid, loading]);

  function changePassword() {
    setLoading(true);
    api.post('users/changepassword', {
      email: route.params.email,
      type: 1,
      oldpassword: secretToken,
      newpassword: newPassword,
    }).then((response) => {
      if (response.data.msg === 'Password do not match') {
        setIsSecretValid(false);
        setLoading(false);
        return;
      }
      navigation.navigate('Login');
      setIsSecretValid(true);
      setLoading(false);
    }).catch((error) => {
      if (error.response.data.msg === 'User not request change password') {
        setRequestNewToken(true);
        setLoading(false);
        return;
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
          <Icon style={styles.inputIcon} name="lock" size={20} color="#2F2F2F" />
          <TextInput
            style={styles.inputText}
            placeholder="Secret..."
            autoCapitalize="none"
            placeholderTextColor="#C1C1C1"
            onChangeText={(text) => setSecretToken(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name="lock" size={20} color="#2F2F2F" />
          <TextInput
            style={styles.inputText}
            placeholder="New Password..."
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#C1C1C1"
            onChangeText={(text) => setNewPassword(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name="lock" size={20} color="#2F2F2F" />
          <TextInput
            style={styles.inputText}
            placeholder="Confirm New Password..."
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#C1C1C1"
            onChangeText={(text) => setConfirmNewPassword(text)}
          />
        </View>
        <View style={styles.errorView}>
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
          {
            isSecretEmpty
              ? (
                <Text style={styles.text}>
                  {'\u2B24'}
                  {' '}
                  Secret token is required
                </Text>
              ) : null
          }
          {
            !isSecretValid
              ? (
                <Text style={styles.text}>
                  {'\u2B24'}
                  {' '}
                  Secret token is invalid
                </Text>
              ) : null
          }
          {
            requestNewToken
              ? (
                <Text style={styles.text}>
                  {'\u2B24'}
                  {' '}
                  Please request a new secret token
                </Text>
              ) : null
          }
        </View>
        <TouchableOpacity
          style={isBtnDisabled ? styles.btnDisabled : styles.btnEnabled}
          disabled={isBtnDisabled}
          onPress={() => changePassword()}
        >
          {
            loading ? <ActivityIndicator size="small" color="#003f5c" />
              : <Text style={styles.buttonText}>Change Password</Text>
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

export default ChangePassword;
