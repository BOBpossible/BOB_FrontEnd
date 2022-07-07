import React, {useEffect, useState} from 'react';
import {RecoilRoot} from 'recoil';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './src/nav';
import {AuthNavigator} from './src/nav';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient, QueryClientProvider} from 'react-query';
import {customAxios} from './src/api/customAxios';

enableScreens();

const queryClient = new QueryClient();

export default function App() {
  const Stack = createStackNavigator();
  const [loading, setLoading] = useState(true); //스플래시 화면을 위한 boolean
  const [isLogin, setIsLogin] = useState<boolean>(false); //로컬스토리지에서 로그인 확인후 어디로 보낼지 결정

  // 실행하면 가장 먼저 로컬에 로그인 정보 있는지 확인
  useEffect(() => {
    getToken();
    const id = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(id);
  }, []);

  const getRegisterStatus = async (token: string) => {
    try {
      //진범이가 실제 get api 만들어주면 정확한 url 입력 요망
      const response = await customAxios(token).get('/v1/api/user/registerStatus');
      if (response.data.result.registerStatus === 'DONE') {
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      //여기서 아이디는 있지만 회원가입을 다 안한 상태라면 로그인 창 띄우고 했다면 메인으로 바로 가기.
      if (value !== null) {
        //GET user register status 그리고 그안에서 setIslogin true 만들거나 false로 냅두기
        getRegisterStatus(value);
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
