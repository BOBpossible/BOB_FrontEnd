import React, {FC} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, SafeAreaView} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Postcode from '@actbase/react-daum-postcode';

type AddressSearchModalProps = {
  visible: boolean;
  closeAddressModal: () => void;
};

const AddressSearchModal: FC<AddressSearchModalProps> = ({visible, closeAddressModal}) => {
  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaView style={{flex: 1}}>
        <View style={[styles.modalHeader]}>
          <TouchableOpacity onPress={closeAddressModal}>
            <View style={[styles.backButton]}>
              <Icon name="arrow-left" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <Postcode
          style={styles.container}
          jsOptions={{animation: true, hideMapBtn: true}}
          onSelected={(data) => {
            console.log(JSON.stringify(data));
            closeAddressModal;
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
  },
  backButton: {
    margin: 10,
  },
  modalHeader: {
    height: 50,
    width: '100%',
  },
});
