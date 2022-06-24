import React from 'react';
import type {FC} from 'react';
import {StyleSheet, View, SafeAreaView, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
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
          <FastImage source={imageUri} style={[styles.image]} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  slide: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  safeView: {flex: 1, backgroundColor: '#000000'},
  modalHeader: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    marginLeft: 16,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: 400,
  },
});
