import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RegisterInterface} from '../../data';
import AddressSearchModal from '../../modal/AddressSearchModal';
import {useRecoilValue} from 'recoil';
import {address} from '../../state';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
type RegisterAddressProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterInterface>>;
  registerData: RegisterInterface;
};

export const RegisterAddress: FC<RegisterAddressProps> = ({setRegisterData, registerData}) => {
  const userAddress = useRecoilValue(address);
  const [addressModal, setAddressModal] = useState(false);
  const [addressDetail, setAddressDetail] = useState('');
  const [focusedAddressDetail, setFocusedAddressDetail] = useState(false);

  useEffect(() => {
    setRegisterData({...registerData, addressStreet: userAddress.address});
  }, [userAddress]);

  return (
    <View style={[styles.addressWrap]}>
      <AddressSearchModal visible={addressModal} closeAddressModal={() => setAddressModal(false)} />
      <Text style={[styles.formHeadText]}>주소</Text>
      <TouchableOpacity onPress={() => setAddressModal(true)}>
        <View style={[styles.nameInput, styles.spacebetweenWrap, styles.unfocusBorder]}>
          <Text style={[userAddress.address === '' && styles.placeholder]}>
            {userAddress.address === '' ? '주소 찾기' : userAddress.address}
          </Text>
          <Icon name="chevron-down" size={25} />
        </View>
      </TouchableOpacity>
      <TextInput
        style={[styles.nameInput, focusedAddressDetail ? styles.focusBorder : styles.unfocusBorder]}
        onChangeText={(text) => {
          setAddressDetail(text);
          setRegisterData({...registerData, addressDetail: text});
        }}
        value={addressDetail}
        placeholder="상세주소 입력"
        onBlur={() => setFocusedAddressDetail(false)}
        onFocus={() => setFocusedAddressDetail(true)}
      />
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
  placeholder: {
    fontSize: 14,
    lineHeight: 24,
    color: '#949494',
  },
});
