import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterNextButton} from '../components';
import {RegisterInterface} from '../data';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../nav';
import {RegisterHeader} from '../components';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterForm'>;

const RegisterForm = ({navigation, route}: Props) => {
  const [registerData, setRegisterData] = useState<RegisterInterface>(route.params.registerData);
  useEffect(() => {
    setRegisterData(route.params.registerData);
  }, []);

  const title = 'RegisterForm';
  const goNext = () => {
    navigation.navigate('RegisterCategory', {registerData});
  };
  const goBack = () => {
    navigation.navigate('Register', {registerData});
  };
  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={goBack} pageNum={1} />
      <View style={[styles.flex]}>
        <Text>{title}</Text>
      </View>
      <RegisterNextButton goNext={goNext} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  backButton: {
    zIndex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterForm;
