import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginOption from '../screens/LoginOption';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginOption" component={LoginOption} />
      <Stack.Screen name="userLogin" component={userLogin} />
      <Stack.Screen name="ownerLogin" component={ownerLogin} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
