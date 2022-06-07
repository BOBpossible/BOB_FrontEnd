import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterNextButton} from '../components';
import {gender, RegisterInterface} from '../data';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../nav';
import {RegisterHeader} from '../components';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterForm'>;

const RegisterForm = ({navigation, route}: Props) => {
  const [registerData, setRegisterData] = useState<RegisterInterface>(route.params.registerData);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<gender>(3);
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [address, setAddress] = useState('');

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
      <View style={[styles.flex, styles.formWrap]}>
        <View>
          <Text style={[styles.formHeadText]}>이름</Text>
          <TextInput
            style={[styles.nameInput]}
            onChangeText={setName}
            value={name}
            placeholder="이름을 입력"
          />
        </View>
        <View style={[styles.gender]}>
          <Text style={[styles.formHeadText]}>성별</Text>
          <View style={[styles.genderWrap]}>
            <View style={[styles.genderUnchecked]}>
              <Text>남자</Text>
            </View>
            <View style={[styles.genderChecked]}>
              <Text>여자</Text>
            </View>
            <View style={[styles.genderUnchecked]}>
              <Text>선택 안함</Text>
            </View>
          </View>
        </View>
        <View style={[styles.birthDate]}>
          <Text style={[styles.formHeadText]}>생년월일</Text>
          <TextInput
            style={[styles.nameInput]}
            onChangeText={setName}
            value={name}
            placeholder="이름을 입력"
          />
        </View>
        <View style={[styles.address]}>
          <Text style={[styles.formHeadText]}>주소</Text>
          <TextInput
            style={[styles.nameInput]}
            onChangeText={setName}
            value={name}
            placeholder="이름을 입력"
          />
          <TextInput
            style={[styles.nameInput]}
            onChangeText={setName}
            value={name}
            placeholder="이름을 입력"
          />
        </View>
        <View />
      </View>
      <RegisterNextButton goNext={goNext} buttonState={1} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  formWrap: {margin: 16, justifyContent: 'space-between'},
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
    borderColor: '#DFDFDF',
    borderRadius: 10,
    paddingLeft: 8,
    paddingTop: 10,
    paddingBottom: 10,
  },
  genderWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderChecked: {
    width: 105,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6C69FF',
    borderRadius: 10,
    backgroundColor: '#F6F6FE',
  },
  genderUnchecked: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 105,
    height: 56,
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 10,
  },
});

export default RegisterForm;
