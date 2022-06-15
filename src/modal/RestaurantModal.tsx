import React from 'react';
import type {FC} from 'react';
import {Modal, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type RestaurantModalProps = {
  restaurantID: number;
  visible: boolean;
  closeRestaurantModal: () => void;
};

const RestaurantModal: FC<RestaurantModalProps> = ({
  restaurantID,
  visible,
  closeRestaurantModal,
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={[styles.safeView]}>
        <View style={[styles.modalHeader]}>
          <TouchableOpacity onPress={closeRestaurantModal}>
            <View style={[styles.backButton]}>
              <Icon name="arrow-left" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <Text>반이학생마라탕</Text>
          <View style={[styles.backButton, {opacity: 0}]}>
            <Icon name="arrow-left" size={24} color="black" />
          </View>
        </View>
        <Text>HELOOEKFOFKOKGOKGOGKO RESTAURANT</Text>
      </SafeAreaView>
    </Modal>
  );
};

export default RestaurantModal;

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
