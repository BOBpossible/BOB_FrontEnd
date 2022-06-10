import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {AuthStackParamList} from '../nav';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const KakaoLogin = ({navigation, route}: Props) => {
  const [token, setToken] = useRecoilState(userToken);
  const INJECTED_JAVASCRIPT =
    '(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';
  const handleLogin = async (event: any) => {
    // console.log(JSON.parse(event.nativeEvent.data));
    const result = JSON.parse(event.nativeEvent.data);
    const success = result.isSuccess;
    if (success) {
      const tokenTemp = result.result.accessToken;
      try {
        await setToken(tokenTemp);
      } catch (e) {
        console.log(e);
      }
      if (result.result.registerStatus === 'NEW') {
        navigation.navigate('Register');
      } else {
        navigation.navigate('MainNavigator');
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        scalesPageToFit={false}
        style={{marginTop: 30}}
        source={{uri: 'https://bobpossible.shop/oauth2/authorization/kakao'}}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled={true}
        onMessage={handleLogin}
        incognito={true}
        onNavigationStateChange={(e) => {
          if (e.url.includes('bobpossible.shop/auth/success')) {
            e.stopLoading();
            return false;
          }
        }}
      />
    </SafeAreaView>
  );
};

export default KakaoLogin;
