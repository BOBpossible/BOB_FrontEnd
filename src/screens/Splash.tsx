import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native-paper';
import {useRecoilState} from 'recoil';
import {userToken} from '../state';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = () => {
  const [token, setToken] = useRecoilState(userToken);
  const getToken = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      console.log(e);
    }
  }, [setToken]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  const title = '미션밥파서블';
  return (
    <View style={[styles.flex]}>
      <Text style={{fontSize: 30}}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'},
});

export default Splash;
