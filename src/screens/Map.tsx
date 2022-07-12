import React, {useCallback, useMemo, useState} from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddressSearchModal from '../modal/AddressSearchModal';
import StoreModal from '../modal/StoreModal';
import {MapWebview} from '../modal/MapWebview';
import {MapStoreBottomSheet} from '../components/Map/MapStoreBottomSheet';
import {DesignSystem} from '../assets/DesignSystem';
import {useQuery} from 'react-query';
import {IgetUsersMe, IStoreMap} from '../data';
import {getAddress, getStoreList, getUserInfo} from '../api';
import {queryKey} from '../api/queryKey';
import {IAddress} from '../data/Common';

const Map = () => {
  const height = Dimensions.get('screen').height;
  const insets = useSafeAreaInsets();
  const listSnapPoint = height - insets.top - 150;
  const [addressModal, setAddressModal] = useState(false);
  const [storeModal, setStoreModal] = useState(false);
  const [storeId, setStoreId] = useState(0);
  const [noMission, setNoMission] = useState(false);
  //미션개수 연동 후 삭제

  const DataUser = useQuery<IgetUsersMe>(queryKey.USERINFO, getUserInfo);
  const userId = DataUser.data?.userId;
  const StoreList = useQuery<IStoreMap[]>(
    [queryKey.STORELIST, userId],
    () => getStoreList(userId),
    {
      enabled: !!userId,
      onSuccess(data) {
        console.log('가게 리스트 받기 성공: ', data);
      },
      onError(err) {
        setNoMission(true);
        console.log('가게 리스트 받기 실패: ', err);
      },
    },
  );

  const sortList = (data?: IStoreMap[]) => {
    data?.sort(function (a, b) {
      return Number(b.mission) - Number(a.mission);
    });
    return data;
  };

  const Address = useQuery<IAddress>(queryKey.ADDRESS, getAddress);
  const getRandom = () => Math.floor(Math.random() * (2 - 0)); //0 or 1
  const openRestaurantModal = async (id: number) => {
    await setStoreId(id);
    setStoreModal(true);
  };
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} />,
    [],
  );
  return (
    <SafeAreaView style={[styles.flex]}>
      <AddressSearchModal visible={addressModal} closeAddressModal={() => setAddressModal(false)} />
      <StoreModal
        visible={storeModal}
        closeStoreModal={() => setStoreModal(false)}
        storeId={storeId}
      />
      <View style={[styles.headerWrap]}>
        <TouchableOpacity onPress={() => setAddressModal(true)} style={[styles.header]}>
          <Text style={[DesignSystem.h2SB, {color: 'black', marginRight: 11}]}>
            {Address.data?.addressDong}
          </Text>
          <Icon name="menu-down" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <MapWebview userId={DataUser.data?.userId} />

      <BottomSheet
        snapPoints={[55, listSnapPoint]}
        handleIndicatorStyle={{width: 68, backgroundColor: '#C4C4C4'}}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={[styles.missionListTextWrap]}>
          <Text style={[DesignSystem.title3SB, {color: '#111111'}]}>내 주변 가게</Text>
        </BottomSheetView>

        {DataUser.isError ? (
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
            data={sortList(StoreList.data)}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => openRestaurantModal(item.storeId)} key={index}>
                <MapStoreBottomSheet
                  storeName={item.name}
                  storeCategory={item.category}
                  point={item.point}
                  distance={item.distance}
                  image={item.imageUrl}
                  mission={item.mission}
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
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    height: 50,
    width: '100%',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginLeft: 16,
    flexDirection: 'row',
    width: 100,
  },
  missionListTextWrap: {
    marginLeft: 16,
    marginBottom: 16,
  },
});

export default Map;
