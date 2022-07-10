import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomSheet, {BottomSheetFlatList, BottomSheetView} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddressSearchModal from '../modal/AddressSearchModal';
import StoreModal from '../modal/StoreModal';
import {MapWebview} from '../modal/MapWebview';
import {MapStoreBottomSheet} from '../components/Map/MapStoreBottomSheet';
import {DesignSystem} from '../assets/DesignSystem';

const dummyMission = [
  {
    storeId: 0,
    name: '반이학생마라탕',
    distance: 1000,
    category: '중식당',
    point: 500,
    image: {uri: 'https://source.unsplash.com/1024x768/?food'},
  },
  {
    storeId: 0,
    name: '반이학생마라탕',
    distance: 1000,
    category: '중식당',
    point: 500,
    image: {uri: 'https://source.unsplash.com/1024x768/?food'},
  },
  {
    storeId: 0,
    name: '반이학생마라탕',
    distance: 1000,
    category: '중식당',
    point: 500,
    image: {uri: 'https://source.unsplash.com/1024x768/?food'},
  },
];

const Map = () => {
  const height = Dimensions.get('screen').height;
  const insets = useSafeAreaInsets();
  const listSnapPoint = height - insets.top - 150;
  const [addressModal, setAddressModal] = useState(false);
  const [storeModal, setStoreModal] = useState(false);

  const [storeId, setStoreId] = useState(0);
  const [noMission, setNoMission] = useState(false);
  //미션개수 연동 후 삭제

  const getRandom = () => Math.floor(Math.random() * (2 - 0)); //0 or 1
  const openRestaurantModal = async (id: number) => {
    await setStoreId(id);
    setStoreModal(true);
  };
  return (
    <SafeAreaView style={[styles.flex]}>
      <AddressSearchModal visible={addressModal} closeAddressModal={() => setAddressModal(false)} />
      <StoreModal
        visible={storeModal}
        closeStoreModal={() => setStoreModal(false)}
        storeId={storeId}
      />

      <View style={[styles.headerWrap]}>
        <TouchableOpacity style={[styles.header]} onPress={() => setAddressModal(true)}>
          <Text style={[DesignSystem.h2SB, {color: 'black', marginRight: 11}]}>삼성동</Text>
          <Icon name="menu-down" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <MapWebview userId={0} />
      <BottomSheet
        snapPoints={[55, listSnapPoint]}
        handleIndicatorStyle={{width: 68, backgroundColor: '#C4C4C4'}}
      >
        <BottomSheetView style={[styles.missionListTextWrap]}>
          <Text style={[DesignSystem.title3SB, {color: '#111111'}]}>이번주 미션</Text>
        </BottomSheetView>

        {noMission ? (
          <View style={[DesignSystem.centerArrange, {flex: 1, marginBottom: 50}]}>
            <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 2}]}>
              주변에 미션이 없어요🥺
            </Text>
            <Text style={[DesignSystem.body1Lt, {color: '#949494', marginBottom: 38}]}>
              빠른 시일내에 미션을 업데이트 할게요!
            </Text>
            {getRandom() ? (
              <Image source={require('../assets/images/noMission/cryingBob.png')} />
            ) : (
              <Image source={require('../assets/images/noMission/cryingBobBowl.png')} />
            )}
          </View>
        ) : (
          <BottomSheetFlatList
            showsVerticalScrollIndicator={false}
            data={dummyMission}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => openRestaurantModal(item.storeId)} key={index}>
                <MapStoreBottomSheet
                  storeName={item.name}
                  storeCategory={item.category}
                  point={item.point}
                  distance={item.distance}
                  image={item.image}
                />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{marginTop: 4}} />}
          />
        )}
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  headerWrap: {
    width: '100%',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginLeft: 16,
    flexDirection: 'row',
  },
  missionListTextWrap: {
    marginLeft: 16,
    marginBottom: 16,
  },
});

export default Map;
