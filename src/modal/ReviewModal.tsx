import React, {useCallback, useState} from 'react';
import type {FC} from 'react';
import {Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ReviewRate} from '../components/ReviewRate';

type ReviewModalProps = {
  storeId: number;
  visible: boolean;
  closeReviewModal: () => void;
};

const ReviewModal: FC<ReviewModalProps> = ({visible, closeReviewModal, storeId}) => {
  const [rating, setRating] = useState(0);
  const callbackRating = useCallback((rate: number) => {
    setRating(rate);
  }, []);
  console.log(rating);
  return (
    <Modal visible={visible} animationType="fade">
      <SafeAreaView style={[styles.safeView]}>
        <View style={[styles.modalHeader]}>
          <TouchableOpacity
            onPress={() => {
              setRating(0);
              closeReviewModal();
            }}
          >
            <View style={[styles.backButton]}>
              <Icon name="close" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        {<ReviewRate name={'마라탕'} setRating={callbackRating} storeId={storeId} />}
      </SafeAreaView>
    </Modal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: '#FFFFFF'},
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
});
