import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  RegisterNextButton,
  RegisterHeader,
  RegisterName,
  RegisterGender,
  RegisterBirthDate,
  RegisterAddress,
} from '../components';
import {RegisterInterface} from '../data';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../nav';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterForm'>;

const RegisterForm = ({navigation, route}: Props) => {
  const [registerData, setRegisterData] = useState<RegisterInterface>(route.params.registerData);

  //form validation
  const [nameError, setUserError] = useState(false);

  useEffect(() => {
    setRegisterData(route.params.registerData);
  }, []);

  const goNext = () => {
    navigation.navigate('RegisterCategory', {registerData});
  };
  const goBack = () => {
    navigation.navigate('Register');
  };

  const [focusedPhone, setFocusedPhone] = useState(false);

  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={goBack} pageNum={1} />
      <KeyboardAvoidingView style={[{flex: 1}]} behavior="padding">
        <ScrollView style={[styles.flex, styles.formWrap]}>
          <RegisterName setRegisterData={setRegisterData} registerData={registerData} />
          <RegisterGender setRegisterData={setRegisterData} registerData={registerData} />
          <RegisterBirthDate setRegisterData={setRegisterData} registerData={registerData} />
          <RegisterAddress setRegisterData={setRegisterData} registerData={registerData} />
        </ScrollView>
      </KeyboardAvoidingView>
      <RegisterNextButton goNext={goNext} buttonState={1} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  formWrap: {marginLeft: 16, marginRight: 16},
  backButton: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  nameInput: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 8,
    color: '#111111',
  },
  focusBorder: {borderColor: '#6C69FF'},
  unfocusBorder: {borderColor: '#DFDFDF'},
  spacebetweenWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderChecked: {
    borderColor: '#6C69FF',
    backgroundColor: '#F6F6FE',
    color: '#6C69FF',
  },
  genderUnchecked: {
    borderColor: '#DFDFDF',
  },
  genderBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 105,
    height: 56,
    borderWidth: 1,
    borderRadius: 10,
  },
  placeholder: {
    fontSize: 14,
    lineHeight: 24,
    color: '#949494',
  },
  genderWrap: {marginTop: 28},
  birthDateWrap: {marginTop: 28},
  addressWrap: {marginTop: 40},
});

export default RegisterForm;
