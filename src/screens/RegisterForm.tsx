import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
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
import {useForm, Controller} from 'react-hook-form';
import {RegisterPhone} from '../components/Register/RegisterPhone';
import moment from 'moment';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterForm'>;

const RegisterForm = ({navigation, route}: Props) => {
  const [registerData, setRegisterData] = useState<RegisterInterface>(route.params.registerData);
  const [authError, setAuthError] = useState(true);
  //react-hook-form 사용
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      gender: '',
      birthDate: '',
      address: '',
      phone: '',
    },
  });

  useEffect(() => {
    setRegisterData(route.params.registerData);
  }, []);

  const onSubmit = (data: any) => {
    navigation.navigate('RegisterCategory', {registerData});
  };

  const goBack = () => {
    navigation.navigate('Register');
  };
  console.log(authError);
  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={goBack} pageNum={1} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={[styles.flex, styles.formWrap]}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterName
                  setRegisterData={setRegisterData}
                  registerData={registerData}
                  onChange={onChange}
                  value={value}
                  error={errors.name !== undefined}
                />
              );
            }}
            name="name"
          />
          {errors.name?.type === 'required' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterGender
                  setRegisterData={setRegisterData}
                  registerData={registerData}
                  onChange={onChange}
                  value={value}
                  error={errors.gender !== undefined}
                />
              );
            }}
            name="gender"
          />
          {errors.gender?.type === 'required' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
              validate: {
                age14: (value) => {
                  const valueDate = moment(value, 'YYYY-MM-DD');
                  const dateDifference = moment().diff(valueDate, 'years');
                  if (dateDifference > 14) {
                    return true;
                  } else {
                    return false;
                  }
                },
              },
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterBirthDate
                  setRegisterData={setRegisterData}
                  registerData={registerData}
                  onChange={onChange}
                  value={value}
                  error={errors.birthDate !== undefined}
                />
              );
            }}
            name="birthDate"
          />
          {errors.birthDate?.type === 'required' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}
          {errors.birthDate?.type === 'age14' && (
            <Text style={[styles.errorMessage]}>14세 이하 입니다.</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
              validate: {
                authValid: () => {
                  return !authError;
                },
              },
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterPhone
                  setRegisterData={setRegisterData}
                  registerData={registerData}
                  onChange={onChange}
                  value={value}
                  setAuthError={setAuthError}
                />
              );
            }}
            name="phone"
          />
          {errors.phone?.type === 'required' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}
          {errors.phone?.type === 'authValid' && (
            <Text style={[styles.errorMessage]}>인증이 안되었습니다.</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterAddress
                  setRegisterData={setRegisterData}
                  registerData={registerData}
                  onChange={onChange}
                  value={value}
                  error={errors.address !== undefined}
                />
              );
            }}
            name="address"
          />
          {errors.address?.type === 'required' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <RegisterNextButton goNext={handleSubmit(onSubmit)} buttonState={1} />
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
  errorMessage: {color: '#E03D32', marginLeft: 8, marginTop: 4},
});

export default RegisterForm;
