import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RegisterInterface} from '../../data';

type RegisterGenderProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterInterface>>;
  registerData: RegisterInterface;
};

export const RegisterGender: FC<RegisterGenderProps> = ({setRegisterData, registerData}) => {
  const [gender, setGender] = useState('');
  return (
    <View style={[styles.genderWrap]}>
      <Text style={[styles.formHeadText]}>성별</Text>
      <View style={[styles.spacebetweenWrap]}>
        <TouchableOpacity
          onPress={() => {
            setGender('MALE');
            setRegisterData({...registerData, gender: 'MALE'});
          }}
        >
          <View
            style={[
              styles.genderBox,
              gender === 'MALE' ? styles.genderChecked : styles.genderUnchecked,
            ]}
          >
            <Text style={[gender === 'MALE' ? styles.genderChecked : styles.genderUnchecked]}>
              남자
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setGender('FEMALE');
            setRegisterData({...registerData, gender: 'FEMALE'});
          }}
        >
          <View
            style={[
              styles.genderBox,
              gender === 'FEMALE' ? styles.genderChecked : styles.genderUnchecked,
            ]}
          >
            <Text style={[gender === 'FEMALE' ? styles.genderChecked : styles.genderUnchecked]}>
              여자
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setGender('NULL');
            setRegisterData({...registerData, gender: 'NULL'});
          }}
        >
          <View
            style={[
              styles.genderBox,
              gender === 'NULL' ? styles.genderChecked : styles.genderUnchecked,
            ]}
          >
            <Text style={[gender === 'NULL' ? styles.genderChecked : styles.genderUnchecked]}>
              선택 안함
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
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
});
