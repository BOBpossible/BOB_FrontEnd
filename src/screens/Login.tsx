import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';
import SocialWebviewModal from '../modal/SocialWebviewModal';
import {useRecoilState} from 'recoil';
import {userToken} from '../state';

const onAppleButtonPress = async () => {
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: AppleAuthRequestOperation.LOGIN,
    requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
  });

  // get current authentication state for user
  const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

  // use credentialState response to ensure the user is authenticated
  if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
    // user is authenticated
  }
};

const Login = ({}) => {
  const navigation = useNavigation();
  const [token, setToken] = useRecoilState(userToken);
  const [loginModal, setLoginModal] = useState(false);
  const [source, setSource] = useState('');
  console.log(source);
  const signUpWithSNS = async (social: string) => {
    setSource(`https://bobpossible.shop/oauth2/authorization/${social}`);
    setLoginModal(true);
  };

  const goMain = useCallback(() => navigation.navigate('MainNavigator'), []);
  const goRegister = useCallback(() => navigation.navigate('Register'), []);
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
        <Text style={[styles.loginHeadText1]}>Mission!</Text>
        <Text style={[styles.loginHeadText2]}>BoBpossible</Text>
        <Text style={[styles.loginSubHeadText]}> 밥미션을 수행하고, 포인트를 적립하라!</Text>
      </View>
      <View style={[styles.logoWrap]}>
        <View style={[styles.logoImage]}></View>
      </View>
      <SocialWebviewModal
        visible={loginModal}
        source={source}
        closeSocialModal={() => setLoginModal(false)}
      />
      <View style={[styles.loginButtonWrap]}>
        <TouchableOpacity onPress={() => signUpWithSNS('kakao')}>
          <Image style={[styles.iconButton]} source={require('../assets/images/KakaoButton.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signUpWithSNS('naver')}>
          <Image style={[styles.iconButton]} source={require('../assets/images/NaverButton.png')} />
        </TouchableOpacity>
        {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            style={[styles.iconButton]}
            onPress={onAppleButtonPress}
          />
        )}
        <TouchableOpacity onPress={() => signUpWithSNS('google')}>
          <Image
            style={[styles.iconButton]}
            source={require('../assets/images/GoogleButton.png')}
          />
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
  loginHeadText1: {
    fontFamily: 'PretendardSemiBold',
    fontSize: 44,
    fontWeight: 'bold',
  },
  loginHeadText2: {
    fontFamily: 'PretendardSemiBold',
    fontSize: 44,
    fontWeight: 'bold',
    color: '#6C69FF',
  },
  loginSubHeadText: {
    fontFamily: 'PretendardLight',
    color: '#616161',
    fontSize: 17,
    marginTop: 10,
  },
  logoWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 280,
    height: 200,
    backgroundColor: '#D9D9D9',
  },
  loginButtonWrap: {
    marginBottom: 30,
    alignItems: 'center',
  },
  iconButton: {
    width: 340,
    height: 44,
    borderRadius: 10,
    marginBottom: 8,
  },
});

export default Login;
