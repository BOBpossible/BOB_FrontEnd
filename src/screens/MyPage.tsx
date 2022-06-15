import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPage = () => {
  const title = 'MyPage';
  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('userToken', value);
    } catch (e) {
      console.log(e);
    }
  };
  const logout = () => {
    storeData('');
  };
  return (
    <View style={[styles.flex]}>
      <Text>{title}</Text>
      <TouchableOpacity onPress={logout}>
        <View style={{height: 200, width: 200, borderWidth: 1}}>
          <Text>로그아웃</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});

export default MyPage;
