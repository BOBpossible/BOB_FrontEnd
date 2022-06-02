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
        <View style={{height: 100, width: 130, borderWidth: 1}}>
          <Text>로그인 했다치고 등록된 아이디라 홈 화면으로 넘어가기</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goRegister}>
        <View style={{height: 100, width: 130, borderWidth: 1}}>
          <Text>로그인 했는데 가입 안되어있어서 가입화면 가기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});

export default Login;
