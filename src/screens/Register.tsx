import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterNextButton} from '../components';
import {createRegister} from '../data/createRegister';
import {RegisterInterface} from '../data/RegisterInterface';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../nav';
import {RegisterHeader} from '../components';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const Register = ({navigation, route}: Props) => {
  const title = 'Register';
  const [registerData, setRegisterData] = useState<RegisterInterface>(createRegister);

  const goNext = () => {
    navigation.navigate('RegisterForm', {registerData});
  };
  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    //If param registerData exists
    // if (route.params.registerData === undefined) {
    //   setRegisterData(route.params.registerData);
    // }
  }, []);
  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={goBack} pageNum={0} />
      <View style={[styles.flex]}>
        <Text>{title}</Text>
      </View>
      <RegisterNextButton goNext={goNext} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});

export default Register;
