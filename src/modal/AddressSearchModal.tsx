import React, {FC, useEffect, useRef, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, SafeAreaView} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Postcode from '@actbase/react-daum-postcode';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RegisterInterface} from '../data';
import {kakaoGeocoder} from '../api/kakaoGeocoder';
import {useMutation, useQueryClient} from 'react-query';
import {patchAddress} from '../api';
import {queryKey} from '../api/queryKey';
import {IAddress} from '../data/Common';

type AddressSearchModalProps = {
  visible: boolean;
  closeAddressModal: () => void;
  onChange?: (...event: any[]) => void;
  value?: string;
  setRegisterData?: React.Dispatch<React.SetStateAction<RegisterInterface>>;
  registerData?: RegisterInterface;
};

const AddressSearchModal: FC<AddressSearchModalProps> = ({
  visible,
  closeAddressModal,
  onChange,
  value,
  setRegisterData,
  registerData,
}) => {
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const addressMutation = useMutation((address: IAddress) => patchAddress(address), {
    onSuccess: (data) => {
      console.log('주소 변경 성공: ', data);
      queryClient.invalidateQueries(queryKey.ADDRESS);
      queryClient.invalidateQueries(queryKey.STORELIST);
      queryClient.invalidateQueries(queryKey.HOMEDATA);
    },
    onError: (err) => {
      console.log('주소 변경 실패: ', err);
    },
  });
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={closeAddressModal}>
      <SafeAreaView style={{flex: 1}}>
        <View style={[styles.modalHeader, {top: insets.top}]}>
          <TouchableOpacity onPress={closeAddressModal} style={{width: 50}}>
            <View style={[styles.backButton]}>
              <Icon name="arrow-left" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <Postcode
          style={styles.container}
          jsOptions={{animation: false, hideMapBtn: true}}
          onSelected={async (data) => {
            const coordiate = await kakaoGeocoder(data.address);
            if (coordiate !== undefined) {
              if (registerData !== undefined && setRegisterData !== undefined) {
                setRegisterData({
                  ...registerData,
                  addressStreet: data.address,
                  addressDong: data.bname,
                  x: coordiate.x,
                  y: coordiate.y,
                });
              } else {
                addressMutation.mutate({
                  addressStreet: data.address,
                  addressDong: data.bname,
                  x: coordiate.x,
                  y: coordiate.y,
                });
              }
            } else {
              //오류, 좌표 설정 실패
              if (registerData !== undefined && setRegisterData !== undefined) {
                setRegisterData({
                  ...registerData,
                  addressStreet: data.address,
                  addressDong: data.bname,
                  x: '0',
                  y: '0',
                });
              } else {
                addressMutation.mutate({
                  addressStreet: data.address,
                  addressDong: data.bname,
                  x: '0',
                  y: '0',
                });
              }
            }

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
    paddingTop: 50,
  },
  backButton: {
    margin: 10,
  },
  modalHeader: {
    position: 'absolute',
    top: 50,
    height: 50,
    width: '100%',
    zIndex: 1,
    backgroundColor: '#FFFFFF',
  },
});
