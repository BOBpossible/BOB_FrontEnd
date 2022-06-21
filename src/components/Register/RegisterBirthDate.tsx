import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RegisterInterface} from '../../data';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

type RegisterBirthDateProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterInterface>>;
  registerData: RegisterInterface;
};

export const RegisterBirthDate: FC<RegisterBirthDateProps> = ({setRegisterData, registerData}) => {
  const [dateModal, setDateModal] = useState(false);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const handleConfirm = (date: Date) => {
    setBirthDate(date);
    setRegisterData({...registerData, birthDate: moment(date).format('YYYY-MM-DD')});
    setDateModal(false);
  };
  return (
    <View style={[styles.birthDateWrap]}>
      <Text style={[styles.formHeadText]}>생년월일</Text>
      <TouchableOpacity onPress={() => setDateModal(true)}>
        <View style={[styles.nameInput, styles.unfocusBorder]}>
          <Text style={[birthDate === null && styles.placeholder]}>
            {birthDate === null ? '생년월일 입력' : moment(birthDate).format('YYYY-MM-DD')}
          </Text>
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        testID="dateTimePicker"
        isVisible={dateModal}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDateModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  placeholder: {
    fontSize: 14,
    lineHeight: 24,
    color: '#949494',
  },
  birthDateWrap: {marginTop: 28},
  unfocusBorder: {borderColor: '#DFDFDF'},
});
