import {useNavigation} from '@react-navigation/native';
import React, {FC, useRef} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {postFcmToken} from '../api';
//let userAgent =
//  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';
const INJECTED_JAVASCRIPT =
  '(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';

type SocialWebViewProps = {
  source: string;
  closeSocialModal: () => void;
};

const SocialWebview: FC<SocialWebViewProps> = ({source, closeSocialModal}) => {
  const navigation = useNavigation();
  const webviewRef = useRef<WebView | null>(null);

  //GET Login Result URL query param
  const queryString = (rawURL: string) => {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params: any = {},
      match;
    while ((match = regex.exec(rawURL))) {
      params[match[1]] = match[2];
    }
    return params;
  };

  const storeData = async (accessToken: string, refreshToken: string) => {
    try {
      await AsyncStorage.multiSet([
        ['accessToken', accessToken],
        ['refreshToken', refreshToken],
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  const _handleMessage = async (data: any) => {
    console.log(data);
    try {
      await storeData(data.accessToken, data.refreshToken);
    } catch (e) {
      console.log(e);
    }

    messaging()
      .getToken()
      .then((token) => {
        return postFcmToken(token);
      });

    closeSocialModal();
    if (data.role === 'OWNER') {
      Alert.alert('이미 사장님으로 가입되어있는 계정입니다');
    } else {
      if (data.registerStatus === 'NEW') {
        navigation.navigate('Register');
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'MainNavigator'}],
        });
      }
    }
  };
  return (
    <WebView
      ref={webviewRef}
      source={{uri: source}}
      // userAgent={userAgent}
      javaScriptEnabled={true}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      onMessage={_handleMessage}
      onNavigationStateChange={async (e) => {
        const result = queryString(e.url);
        if (e.url.includes('bobpossible.shop/auth/success')) {
          _handleMessage(result);
          webviewRef.current?.stopLoading();
        }
      }}
      originWhitelist={['*']}
      scrollEnabled={false}
      incognito={true}
    />
  );
};
export default SocialWebview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
