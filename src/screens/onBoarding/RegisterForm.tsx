import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  RegisterNextButton,
  RegisterHeader,
  RegisterName,
  RegisterGender,
  RegisterAddress,
} from '../../components';
import {RegisterInterface} from '../../data';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../nav';
import {useForm, Controller} from 'react-hook-form';
import {RegisterPhone} from '../../components/Register/RegisterPhone';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
      // birthDate: '',
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

  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={goBack} pageNum={1} />
      <KeyboardAwareScrollView
        style={[styles.flex, styles.formWrap]}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === 'ios'}
        keyboardShouldPersistTaps="handled"
      >
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

        {/* <Controller
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
        )} */}

        <Controller
          control={control}
          rules={{
            required: true,
            validate: {
              authValid: (value) => {
                return !authError;
              },
            },
            // 휴대폰 인증을 빼기 위해 잠시 주석처리
          }}
          render={({field: {onChange, value}}) => {
            return (
              <RegisterPhone
                setRegisterData={setRegisterData}
                registerData={registerData}
                onChange={onChange}
                value={value}
                authError={authError}
                setAuthError={setAuthError}
                isError={errors.phone !== undefined}
              />
            );
          }}
          name="phone"
        />
        {errors.phone?.type === 'required' && (
          <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
        )}
        {authError && <Text style={[styles.errorMessage]}>인증이 완료되지 않았습니다.</Text>}
        {!authError && <Text style={[styles.clearMessage]}>인증이 완료되었습니다.</Text>}

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
      </KeyboardAwareScrollView>
      <RegisterNextButton goNext={handleSubmit(onSubmit)} buttonState={1} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  formWrap: {marginLeft: 16, marginRight: 16},
  errorMessage: {color: '#E03D32', marginLeft: 8, marginTop: 4},
  clearMessage: {color: '#6C69FF', marginLeft: 8, marginTop: 4},
});

export default RegisterForm;
