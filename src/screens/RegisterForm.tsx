import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterNextButton} from '../components';
import {RegisterInterface} from '../data';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../nav';
import {RegisterHeader} from '../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AddressSearchModal from '../modal/AddressSearchModal';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterForm'>;

const RegisterForm = ({navigation, route}: Props) => {
  const [registerData, setRegisterData] = useState<RegisterInterface>(route.params.registerData);
  const [name, setName] = useState('');
  const [gender, setGender] = useState(3);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [addressModal, setAddressModal] = useState(false);
  const [addressStreet, setAddressStreet] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [dateModal, setDateModal] = useState(false);

  useEffect(() => {
    setRegisterData(route.params.registerData);
  }, []);

  const goNext = () => {
    navigation.navigate('RegisterCategory', {registerData});
  };
  const goBack = () => {
    navigation.navigate('Register', {registerData});
  };

  const handleConfirm = (date: Date) => {
    setBirthDate(date);
    setDateModal(false);
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
            <TouchableOpacity onPress={() => setGender(0)}>
              <View
                style={[
                  styles.genderBox,
                  gender === 0 ? styles.genderChecked : styles.genderUnchecked,
                ]}
              >
                <Text style={[gender === 0 ? styles.genderChecked : styles.genderUnchecked]}>
                  남자
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender(1)}>
              <View
                style={[
                  styles.genderBox,
                  gender === 1 ? styles.genderChecked : styles.genderUnchecked,
                ]}
              >
                <Text style={[gender === 1 ? styles.genderChecked : styles.genderUnchecked]}>
                  여자
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender(2)}>
              <View
                style={[
                  styles.genderBox,
                  gender === 2 ? styles.genderChecked : styles.genderUnchecked,
                ]}
              >
                <Text style={[gender === 2 ? styles.genderChecked : styles.genderUnchecked]}>
                  선택 안함
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.birthDate]}>
          <Text style={[styles.formHeadText]}>생년월일</Text>
          <TouchableOpacity onPress={() => setDateModal(true)}>
            <View style={[styles.nameInput]}>
              <Text style={[styles.placeholder]}>
                {birthDate === null ? '생년월일 입력' : moment(birthDate).format('YYYY/MM/DD')}
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
        <View style={[styles.address]}>
          <AddressSearchModal
            visible={addressModal}
            closeAddressModal={() => setAddressModal(false)}
          />
          <Text style={[styles.formHeadText]}>주소</Text>
          <TouchableOpacity onPress={() => setAddressModal(true)}>
            <View style={[styles.nameInput]}>
              <Text style={[styles.placeholder]}>
                {addressStreet === '' ? '주소 찾기' : addressStreet}
              </Text>
            </View>
          </TouchableOpacity>
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
});

export default RegisterForm;
