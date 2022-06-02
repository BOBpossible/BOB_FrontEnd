import React, {useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const title = 'Login';

  const goMain = useCallback(() => navigation.navigate('MainNavigator'), []);
  const goRegister = useCallback(() => navigation.navigate('Register'), []);
  return (
    <View style={[styles.flex]}>
      <Text>{title}</Text>
      <TouchableOpacity onPress={goMain}>
        <View style={{height: 30, width: 30, borderWidth: 1}}>
          <Text>홈</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goRegister}>
        <View style={{height: 30, width: 30, borderWidth: 1}}>
          <Text>가입</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});

export default Login;
