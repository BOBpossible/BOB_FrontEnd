import React, {useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const baseURL = 'https://bobpossible.shop';

const Login = ({}) => {
  const navigation = useNavigation();

  const goMain = useCallback(() => navigation.navigate('MainNavigator'), []);
  const goRegister = useCallback(() => navigation.navigate('Register'), []);
  const goKakao = useCallback(() => navigation.navigate('KakaoLogin'), []);

  return (
    <SafeAreaView style={styles.flex}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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

      <View style={[styles.loginTitle]}>
        <Text style={{fontSize: 50}}>로고</Text>
        <Text style={{fontSize: 20}}>미션밥파서블</Text>
      </View>
      <View style={[styles.logoWrap]}>
        <TouchableOpacity onPress={goKakao}>
          <Image style={[styles.iconButton]} source={require('../assets/images/kakaoIcon.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={[styles.iconButton]} source={require('../assets/images/naverIcon.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={[styles.iconButton]} source={require('../assets/images/appleIcon.png')} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  loginTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 23, //디버깅용 메뉴 사라지면 53
  },
  logoWrap: {
    marginBottom: 92,
    marginLeft: 64,
    marginRight: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default Login;
