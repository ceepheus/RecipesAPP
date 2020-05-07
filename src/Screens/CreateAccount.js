import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

const CreateAccount = () => {
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

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.createBtn}>
        <Text style={styles.createText}>CREATE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
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
  createBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  createText: {
    color: 'white',
    fontSize: 11,
  },
  errorView: {
    alignSelf: 'flex-start',
    paddingLeft: 50,
  },
  errorMessage: {
    color: 'white',
    fontSize: 11,
  },
});

export default CreateAccount;
