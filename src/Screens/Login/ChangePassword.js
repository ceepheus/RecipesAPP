import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import api from '../../Services/Axios/Api';

import styles from './Styles';

const ChangePassword = ({ route, navigation }) => {

  const [secretToken, setSecretToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  function changePassword() {
    console.log('oi');

    api.post('users/changepassword', {
      email: route.params.email,
      type: 1,
      oldpassword: secretToken,
      newpassword: newPassword,
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error.response);
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
            placeholder="Secret..."
            autoCapitalize="none"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setSecretToken(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="New Password..."
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setNewPassword(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Confirm New Password..."
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setConfirmNewPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={isBtnDisabled ? styles.loginBtnDisabled : styles.loginBtnEnabled}
          onPress={() => changePassword()}
        >
          <Text style={styles.sendText}>Change Password</Text>
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

export default ChangePassword;
