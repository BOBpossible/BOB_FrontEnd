import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RegisterInterface} from '../../data';
import {DesignSystem} from '../../assets/DesignSystem';
import axios from 'axios';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';

type RegisterPhoneProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterInterface>>;
  registerData: RegisterInterface;
  onChange: (...event: any[]) => void;
  value: string;
  setAuthError: React.Dispatch<React.SetStateAction<boolean>>;
  authError: boolean;
  authKey: string;
  setAuthKey: React.Dispatch<React.SetStateAction<string>>;
  isError: boolean;
};

export const RegisterPhone: FC<RegisterPhoneProps> = ({
  setRegisterData,
  registerData,
  setAuthError,
  onChange,
  value,
  isError,
  authKey,
  setAuthKey,
  authError,
}) => {
  const [focusedName, setFocusedName] = useState(false);
  const [focusedAuth, setFocusedAuth] = useState(false);

  const [authInput, setAuthInput] = useState('');
  console.log(authKey);
  const postPhone = async () => {
    try {
      const response = await axios.post('https://bobpossible.shop/auth/phone-validation', null, {
        params: {phone: registerData.phone},
      });
      setAuthError(true);
      setAuthKey(response.data.result.certNum);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authInput === authKey) {
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  }, [authInput]);

  return (
    <View style={[styles.nameWrap]}>
      <Text style={[DesignSystem.title1SB, DesignSystem.grey14]}>전화번호</Text>
      <View style={[styles.phoneInputWrap]}>
        <TextInput
          style={[styles.nameInput, focusedName ? styles.focusBorder : styles.unfocusBorder]}
          onChangeText={(text) => {
            onChange(text);
            setRegisterData({...registerData, phone: text});
          }}
          value={registerData.phone}
          placeholder="전화번호 입력"
          placeholderTextColor="#949494"
          selectionColor={'#6C69FF'}
          onBlur={() => setFocusedName(false)}
          onFocus={() => setFocusedName(true)}
          keyboardType="number-pad"
          maxLength={11}
        />
        {registerData.phone.length === 11 ? (
          <TouchableOpacity onPress={() => postPhone()} style={styles.enableButton}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.purple5]}>
              {authKey !== '-1' ? '다시 받기' : '인증번호 받기'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.disableButton}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey12]}>인증번호 받기</Text>
          </View>
        )}
      </View>
      {authKey !== '-1' ? (
        <TextInput
          style={[
            styles.authInput,
            authError && focusedAuth
              ? styles.errorBorderFocus
              : authError && !focusedAuth
              ? styles.errorBorderNoFocus
              : focusedAuth
              ? styles.focusBorder
              : styles.unfocusBorder,
          ]}
          onChangeText={(text) => {
            setAuthInput(text);
          }}
          value={authInput}
          placeholder="인증번호 입력"
          placeholderTextColor="#949494"
          selectionColor={'#6C69FF'}
          onBlur={() => setFocusedAuth(false)}
          onFocus={() => setFocusedAuth(true)}
          keyboardType="number-pad"
          maxLength={6}
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
    width: wp(calWidth(200)),
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
  phoneInputWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    marginTop: 8,
    width: '100%',
  },

  disableButton: {
    width: wp(calWidth(138)),
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
    width: wp(calWidth(138)),
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
