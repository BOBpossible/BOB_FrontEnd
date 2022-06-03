import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterNextButton} from '../components';
import {RegisterInterface} from '../data';

const RegisterForm = ({navigation}) => {
  const [registerData, setRegisterData] = useState<RegisterInterface>();
  const title = 'RegisterForm';
  const goNext = () => {
    navigation.navigate('RegisterCategory', {registerData});
  };
  return (
    <SafeAreaView style={[styles.flex]}>
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

export default RegisterForm;
