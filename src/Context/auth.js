import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { googleKey } from 'react-native-dotenv';
import api from '../Services/Axios/Api';

const AuthContext = createContext({
  signed: Boolean,
  token: String,
  loginContext: Promise,
  logoutContext: Object,
  resetErrors: Object,
  error: Boolean,
  errorMessage: String,
  loading: Boolean,
  splashScreen: Boolean,
  googleSigin: Object,
});

export const AuthProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [splashScreen, setSplashScreen] = useState(false);
  const [userInfo, setuserInfo] = useState(null);

  useEffect(() => {
    async function loadStorageData() {
      setSplashScreen(true);
      setTimeout(async () => {
        const storageToken = await AsyncStorage.getItem('token');

        if (storageToken) {
          setSignedIn(true);
        }
        setSplashScreen(false);
      }, 3000);
    }
    loadStorageData();
  }, []);

  function loginContext(email, password) {
    setLoading(true);
    setError(false);
    setErrorMessage(false);
    api.post('users/login', {
      email,
      password,
    }).then(async (response) => {
      await AsyncStorage.setItem('token', response.data.token);
      setSignedIn(true);
      setLoading(false);
    }).catch((responseError) => {
      setError(true);
      if (responseError.response.data.msg === 'Access invalid') {
        setErrorMessage(responseError.response.data.msg);
      }
      setLoading(false);
    });
  }

  function logoutContext() {
    AsyncStorage.clear();
    setSignedIn(false);
  }

  function resetErrors() {
    setError(false);
    setErrorMessage('');
  }

  async function googleSigin() {
    setError(false);
    setErrorMessage(false);
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: googleKey,
      offlineAccess: true,
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true,
      accountName: '', // [Android] specifies an account name on the device that should be used
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userResp = await GoogleSignin.signIn();
      setuserInfo(userResp);
      api.post('users/create-or-login-google', {
        name: userResp.user.name,
        email: userResp.user.email,
        id: userResp.user.id,
        photo: userResp.user.photo,
      }).then(async (response) => {
        await AsyncStorage.setItem('token', response.data.token);
        setSignedIn(true);
        setLoading(false);
      }).catch((responseError) => {
        setError(true);
        if (responseError.response.data.msg === 'Access invalid') {
          setErrorMessage(responseError.response.data.msg);
        }
        setLoading(false);
      });
    } catch (err) {
      setError(true);
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        setErrorMessage('SIGN_IN_CANCELLED');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        setErrorMessage('IN_PROGRESS');
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setErrorMessage('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        setErrorMessage('ERROR');
      }
    }
  }

  return (
    <AuthContext.Provider value={{
      signed: signedIn,
      loginContext,
      logoutContext,
      resetErrors,
      error,
      errorMessage,
      loading,
      splashScreen,
      googleSigin,
    }}
    >
      {
        children
      }
    </AuthContext.Provider>
  );
};

export default AuthContext;
