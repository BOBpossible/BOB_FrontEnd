import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {RegisterInterface} from '../../data';

type RegisterNameProps = {
  setName: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterInterface>>;
  registerData: RegisterInterface;
};

export const RegisterName: FC<RegisterNameProps> = ({
  setName,
  name,
  setRegisterData,
  registerData,
}) => {
  const [focusedName, setFocusedName] = useState(false);
  return (
    <View style={[styles.nameWrap]}>
      <Text style={[styles.formHeadText]}>이름</Text>
      <TextInput
        style={[styles.nameInput, focusedName ? styles.focusBorder : styles.unfocusBorder]}
        onChangeText={(text) => {
          setName(text);
          setRegisterData({...registerData, name: text});
        }}
        value={name}
        placeholder="이름을 입력"
        selectionColor={'#6C69FF'}
        onBlur={() => setFocusedName(false)}
        onFocus={() => setFocusedName(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  nameWrap: {
    marginTop: 20,
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
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
});
