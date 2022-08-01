import React, {useEffect, useState} from 'react';
import {RecoilRoot} from 'recoil';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/screens/onBoarding/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './src/nav';
import {AuthNavigator} from './src/nav';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient, QueryClientProvider} from 'react-query';
import {getRegisterStatus, postFcmToken, postToken} from './src/api';
import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

enableScreens();
//test
const queryClient = new QueryClient();

export default function App() {
  const Stack = createStackNavigator();
  const [loading, setLoading] = useState(true); //스플래시 화면을 위한 boolean
  const [isLogin, setIsLogin] = useState<boolean>(false); //로컬스토리지에서 로그인 확인후 어디로 보낼지 결정

  // 실행하면 가장 먼저 로컬에 로그인 정보 있는지 확인
  useEffect(() => {
    getTokens();

    requestUserPermission();

    messaging()
      .getToken()
      .then((token) => {
        console.log('나의 소중한 기계의 토큰 ', token);
        return postFcmToken(token);
      });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    AppRegistry.registerComponent('app', () => App);

    const id = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(id);
  }, []);

  const getTokens = async () => {
    try {
      const value = await AsyncStorage.getItem('accessToken');
      //여기서 아이디는 있지만 회원가입을 다 안한 상태라면 로그인 창 띄우고 했다면 메인으로 바로 가기.
      if (value !== null || value !== '') {
        //GET user register status 그리고 그안에서 setIslogin true 만들거나 false로 냅두기

        const newToken = await postToken();

        await AsyncStorage.multiSet([
          ['accessToken', newToken.result.accessToken],
          ['refreshToken', newToken.result.refreshToken],
        ]);

        const registerResult = await getRegisterStatus();
        console.log('가입 상태 확인 요청:', registerResult);
        if (registerResult !== 'NEW') {
          setIsLogin(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
              {loading ? (
                <Stack.Screen name="Splash" component={Splash} />
              ) : isLogin ? (
                <Stack.Screen name="MainNavigator" component={MainNavigator} />
              ) : (
                <Stack.Screen name="AuthNavigation" component={AuthNavigator} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
