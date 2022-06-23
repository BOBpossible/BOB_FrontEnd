import React, {useEffect, useState} from 'react';
import {RecoilRoot} from 'recoil';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './src/nav';
import {AuthNavigator} from './src/nav';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

enableScreens();
export default function App() {
  const Stack = createStackNavigator();
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    getToken();
    const id = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(id);
  }, []);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      console.log(value);
      if (value !== null) {
        setIsLogin(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {flex: 1},
});
