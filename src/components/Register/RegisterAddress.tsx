import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AddressSearchModal from '../../modal/AddressSearchModal';
import {useRecoilValue} from 'recoil';
import {address} from '../../state';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegisterInterface} from '../../data';
type RegisterAddressProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterInterface>>;
  registerData: RegisterInterface;
  onChange: (...event: any[]) => void;
  value: string;
  error: boolean;
};

export const RegisterAddress: FC<RegisterAddressProps> = ({
  setRegisterData,
  registerData,
  onChange,
  value,
  error,
}) => {
  const [addressModal, setAddressModal] = useState(false);
  const userAddress = useRecoilValue(address);

  //지도 모달에서 주소 바뀔때마다 회원가입 데이타 갱신
  useEffect(() => {
    setRegisterData({
      ...registerData,
      addressStreet: userAddress.address,
      addressDong: userAddress.bname,
    });
  }, [userAddress]);

  useEffect(() => {}, [userAddress]);
  return (
    <View style={[styles.addressWrap]}>
      <AddressSearchModal
        visible={addressModal}
        closeAddressModal={() => setAddressModal(false)}
        value={value}
        onChange={onChange}
        registerData={registerData}
        setRegisterData={setRegisterData}
      />
      <Text style={[styles.formHeadText]}>주소</Text>
      <TouchableOpacity onPress={() => setAddressModal(true)}>
        <View
          style={[
            styles.nameInput,
            styles.spacebetweenWrap,
            error ? styles.errorBorderNoFocus : styles.unfocusBorder,
          ]}
        >
          <Text style={[value === '' && styles.placeholder]}>
            {value === '' ? '주소 찾기' : value}
          </Text>
          <Icon name="chevron-down" size={24} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addressWrap: {marginTop: 40},
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
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
  unfocusBorder: {borderColor: '#DFDFDF', borderWidth: 1},
  errorBorderNoFocus: {borderColor: '#E03D32', borderWidth: 0.5},
  spacebetweenWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeholder: {
    fontSize: 14,
    lineHeight: 24,
    color: '#949494',
  },
});
