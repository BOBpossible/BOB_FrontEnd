import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {RegisterNextButton} from '../components';
import {createRegister} from '../data/createRegister';
import {RegisterInterface} from '../data/RegisterInterface';

const Register = ({navigation}) => {
  const title = 'Register';
  const [registerData, setRegisterData] = useState<RegisterInterface>(createRegister);

  const goNext = () => {
    navigation.navigate('RegisterForm', {registerData});
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

export default Register;
