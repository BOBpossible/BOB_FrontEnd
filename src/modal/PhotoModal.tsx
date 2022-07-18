import React from 'react';
import type {FC} from 'react';
import {StyleSheet, View, SafeAreaView, TouchableOpacity, Modal, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../assets/CalculateLength';

type PhotoModalProps = {
  imageUri: {uri: string};
  visible: boolean;
  closePhotoModal: () => void;
};

export const PhotoModal: FC<PhotoModalProps> = ({visible, closePhotoModal, imageUri}) => {
  return (
    <Modal visible={visible} animationType="fade">
      <SafeAreaView style={[styles.safeView]}>
        <View style={[styles.modalHeader]}>
          <TouchableOpacity onPress={closePhotoModal}>
            <View style={[styles.backButton]}>
              <Icon name="close" size={24} color="grey" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.slide]}>
          <FastImage source={imageUri} style={[styles.image]} resizeMode="center" />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  slide: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  safeView: {flex: 1, backgroundColor: '#000000'},
  modalHeader: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backButton: {
    marginLeft: 16,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: Platform.OS === 'ios' ? hp(calHeight(700, true)) : hp(calHeight(700)),
  },
});
