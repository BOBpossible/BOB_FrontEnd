import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Splash from './src/screens/Splash';
import Main from './src/screens/Main';
import Login from './src/screens/Login';
export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(false);
      setIsLogin(true);
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  console.log(loading);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      {loading ? <Splash /> : isLogin ? <Main /> : <Login />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {flex: 1},
});
