import React, {FC, useEffect, useRef, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, SafeAreaView} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Postcode from '@actbase/react-daum-postcode';
import {useSetRecoilState} from 'recoil';
import {address} from '../state';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RegisterInterface} from '../data';

type AddressSearchModalProps = {
  visible: boolean;
  closeAddressModal: () => void;
  value?: string;
  onChange?: (...event: any[]) => void;
  registerData: RegisterInterface;
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterInterface>>;
};

const AddressSearchModal: FC<AddressSearchModalProps> = ({
  visible,
  closeAddressModal,
  onChange,
  registerData,
  setRegisterData,
}) => {
  const insets = useSafeAreaInsets();
  const setAddressStreet = useSetRecoilState(address);

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={{flex: 1}}>
        <View style={[styles.modalHeader, {top: insets.top}]}>
          <TouchableOpacity onPress={closeAddressModal}>
            <View style={[styles.backButton]}>
              <Icon name="arrow-left" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <Postcode
          style={styles.container}
          jsOptions={{animation: false, hideMapBtn: true}}
          onSelected={(data) => {
            setAddressStreet({address: data.address, bname: data.bname});
            if (onChange !== undefined) {
              onChange(data.address);
            }
            closeAddressModal();
          }}
          onError={function (error: unknown): void {
            throw new Error('Function not implemented.');
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};
export default AddressSearchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  backButton: {
    margin: 10,
  },
  modalHeader: {
    position: 'absolute',
    top: 44,
    height: 40,
    width: '100%',
    zIndex: 1,
    backgroundColor: '#FFFFFF',
  },
});
