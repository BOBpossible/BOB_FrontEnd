import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {RegisterInterface} from '../../data';

type RegisterNameProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterInterface>>;
  registerData: RegisterInterface;
  onChange: (...event: any[]) => void;
  value: string;
  error: boolean;
};

export const RegisterName: FC<RegisterNameProps> = ({
  setRegisterData,
  registerData,
  onChange,
  value,
  error,
}) => {
  const [focusedName, setFocusedName] = useState(false);
  return (
    <View style={[styles.nameWrap]}>
      <Text style={[styles.formHeadText]}>이름</Text>
      <TextInput
        style={[
          styles.nameInput,
          error && focusedName
            ? styles.errorBorderFocus
            : error && !focusedName
            ? styles.errorBorderNoFocus
            : focusedName
            ? styles.focusBorder
            : styles.unfocusBorder,
        ]}
        onChangeText={(text) => {
          onChange(text);
          setRegisterData({...registerData, name: text});
        }}
        value={value}
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

    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 8,
    color: '#111111',
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
});
