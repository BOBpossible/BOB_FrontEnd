import React from 'react';
import type {FC} from 'react';
import {Modal, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';

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
  const dot = () => {
    const dotStyle = {
      backgroundColor: '#ffffffb2',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 2,
      marginRight: 2,
      marginTop: 2,
      marginBottom: -10,
    };
    return <View style={dotStyle} />;
  };
  const activeDot = () => {
    const activeDotStyle = {
      backgroundColor: '#6C69FF',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 2,
      marginRight: 2,
      marginTop: 2,
      marginBottom: -10,
    };
    return <View style={activeDotStyle} />;
  };

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
        <View style={{height: 220}}>
          <Swiper dot={dot()} activeDot={activeDot()} showsButtons={false}>
            <Image
              source={{uri: 'https://source.unsplash.com/1024x768/?nature'}}
              style={{width: '100%', height: 220}}
            />
            <Image
              source={{uri: 'https://source.unsplash.com/1024x768/?water'}}
              style={{width: '100%', height: 220}}
            />
            <Image
              source={{uri: 'https://source.unsplash.com/1024x768/?girl'}}
              style={{width: '100%', height: 220}}
            />
            <Image
              source={{uri: 'https://source.unsplash.com/1024x768/?tree'}}
              style={{width: '100%', height: 220}}
            />
          </Swiper>
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
