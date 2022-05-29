import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import MainNavigator from './src/nav/MainNavigator';
import Login from './src/screens/customer/Login';
import {NavigationContainer} from '@react-navigation/native';
export default function App() {
  const Stack = createStackNavigator();

  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(false);
      setIsLogin(true);
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  console.log(loading);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {loading ? (
            <Stack.Screen name="Splash" component={Splash} />
          ) : isLogin ? (
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {flex: 1},
});
