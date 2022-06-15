import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomSheet, {BottomSheetFlatList, BottomSheetView} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddressSearchModal from '../modal/AddressSearchModal';
import RestaurantModal from '../modal/RestaurantModal';

const dummyMission = [
  {
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: 10000,
    point: 500,
  },
  {
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: 10000,
    point: 500,
  },
  {
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: 10000,
    point: 500,
  },
];

const Map = () => {
  const height = Dimensions.get('screen').height;
  const insets = useSafeAreaInsets();
  const listSnapPoint = height - insets.top - 150;
  const [addressModal, setAddressModal] = useState(false);
  const [restaurantModal, setRestaurantModal] = useState(false);
  const [restaurantID, setRestaurantID] = useState(0);

  const openRestaurantModal = async (id: number) => {
    await setRestaurantID(id);
    setRestaurantModal(true);
  };
  return (
    <SafeAreaView style={[styles.flex]}>
      <AddressSearchModal visible={addressModal} closeAddressModal={() => setAddressModal(false)} />
      <RestaurantModal
        visible={restaurantModal}
        closeRestaurantModal={() => setRestaurantModal(false)}
        restaurantID={0}
      />
      <View style={[styles.headerWrap]}>
        <TouchableOpacity style={[styles.header]} onPress={() => setAddressModal(true)}>
          <Text style={[styles.headerText]}>삼성동</Text>
          <Icon name="menu-down" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <View style={[styles.webviewWrap]}></View>
      <BottomSheet
        snapPoints={[60, listSnapPoint]}
        handleIndicatorStyle={{width: 68, backgroundColor: '#C4C4C4'}}
      >
        <BottomSheetView style={[styles.missionListTextWrap]}>
          <Text style={[styles.missionListText]}>미션 목록</Text>
        </BottomSheetView>
        <BottomSheetFlatList
          showsVerticalScrollIndicator={false}
          data={dummyMission}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => openRestaurantModal(0)}>
              <View style={{width: '100%', height: 300, backgroundColor: 'lightgrey'}}></View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{margin: 16}} />}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  headerWrap: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 14,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 17,
    color: 'black',
    marginRight: 4,
    fontWeight: '600',
  },
  webviewWrap: {
    flex: 1,
    backgroundColor: 'grey',
  },
  missionListTextWrap: {
    marginLeft: 16,
  },
  missionListText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Map;
