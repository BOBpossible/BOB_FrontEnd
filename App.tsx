import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import MainNavigator from './src/nav/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/nav/AuthNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  const Stack = createStackNavigator();

  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(false);
      setIsLogin(false);
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {flex: 1},
});
