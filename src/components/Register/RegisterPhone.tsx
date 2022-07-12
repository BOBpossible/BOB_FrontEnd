import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RegisterInterface} from '../../data';
import {customAxios} from '../../api';

type RegisterPhoneProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterInterface>>;
  registerData: RegisterInterface;
};

export const RegisterPhone: FC<RegisterPhoneProps> = ({setRegisterData, registerData}) => {
  const [focusedName, setFocusedName] = useState(false);
  const [focusedAuth, setFocusedAuth] = useState(false);
  const [convertNumber, setConvertNumber] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [authInput, setAuthInput] = useState('');

  const postPhone = async () => {
    try {
      const response = await customAxios().post('/api/v1/');
      setAuthKey(response.data);
    } catch (error) {}
  };

  console.log(registerData);
  useEffect(() => {
    if (convertNumber.length === 10) {
      setConvertNumber(convertNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (convertNumber.length === 13) {
      setConvertNumber(
        convertNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      );
    }
    setRegisterData({...registerData, phone: convertNumber.replace(/-/g, '')});
  }, [convertNumber]);

  return (
    <View style={[styles.nameWrap]}>
      <Text style={[styles.formHeadText]}>전화번호</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 44,
          marginTop: 8,
        }}
      >
        <TextInput
          style={[styles.nameInput, focusedName ? styles.focusBorder : styles.unfocusBorder]}
          onChangeText={(text) => {
            setConvertNumber(text);
          }}
          value={convertNumber}
          placeholder="000  -  0000  -  0000"
          selectionColor={'#6C69FF'}
          onBlur={() => setFocusedName(false)}
          onFocus={() => setFocusedName(true)}
          keyboardType="number-pad"
          maxLength={13}
        />
        {convertNumber.length === 13 ? (
          <TouchableOpacity onPress={() => {}} style={styles.enableButton}>
            <Text>{authKey !== '' ? '다시 받기' : '인증번호 받기'}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.disableButton}>
            <Text>인증번호 받기</Text>
          </View>
        )}
      </View>
      {authKey !== '' ? (
        <TextInput
          style={[styles.authInput, focusedAuth ? styles.focusBorder : styles.unfocusBorder]}
          onChangeText={(text) => {
            setAuthInput(text);
          }}
          value={authInput}
          placeholder="인증번호"
          selectionColor={'#6C69FF'}
          onBlur={() => setFocusedAuth(false)}
          onFocus={() => setFocusedAuth(true)}
          keyboardType="number-pad"
          maxLength={13}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nameWrap: {
    marginTop: 32,
  },
  nameInput: {
    width: 200,
    height: 44,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#111111',
    alignSelf: 'center',
  },
  authInput: {
    width: '100%',
    height: 44,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#111111',
    alignSelf: 'center',
    marginTop: 12,
  },
  errorBorderFocus: {borderColor: '#E03D32', borderWidth: 1},
  errorBorderNoFocus: {borderColor: '#E03D32', borderWidth: 0.5},
  focusBorder: {borderColor: '#6C69FF', borderWidth: 1},
  unfocusBorder: {borderColor: '#DFDFDF', borderWidth: 1},
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },

  disableButton: {
    width: 135,
    height: 44,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8C8C8',
  },
  enableButton: {
    width: 135,
    height: 44,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderColor: '#6C69FF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
