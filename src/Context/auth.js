import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

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
});

export const AuthProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [splashScreen, setSplashScreen] = useState(false);

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
    }}
    >
      {
        children
      }
    </AuthContext.Provider>
  );
};

export default AuthContext;
