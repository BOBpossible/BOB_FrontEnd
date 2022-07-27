import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
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
import {ConnectionError} from '../components/ConnectionError';
import WebView from 'react-native-webview';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../assets/CalculateLength';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const Map = () => {
  const height = Dimensions.get('screen').height;
  const listSnapPoint =
    Platform.OS === 'ios' ? hp(calHeight(height - 220, true)) : hp(calHeight(height - 220));
  const [addressModal, setAddressModal] = useState(false);
  const [storeModal, setStoreModal] = useState(false);
  const [storeId, setStoreId] = useState(0);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
    } else {
      storeListRef.current?.snapToIndex(0);
    }
  }, [isFocused]);
  const navigation = useNavigation();
  const webviewRef = useRef<WebView | null>(null);
  const storeListRef = useRef<BottomSheet | null>(null);
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
        console.log('가게 리스트 받기 실패: ', err);
      },
    },
  );

  const Address = useQuery<IAddress>(queryKey.ADDRESS, getAddress);
  if (Address.isSuccess) {
    if (webviewRef.current !== null) {
      webviewRef.current.reload();
    }
  }

  const sortList = (data?: IStoreMap[]) => {
    data?.sort(function (a, b) {
      return Number(b.mission) - Number(a.mission);
    });
    return data;
  };

  const openRestaurantModal = async (id: number) => {
    await setStoreId(id);
    setStoreModal(true);
  };
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} pressBehavior={0} disappearsOnIndex={0} appearsOnIndex={1} />
    ),
    [],
  );

  if (DataUser.isError || StoreList.isError) {
    return <ConnectionError refetch={DataUser.refetch} />;
  }

  return (
    <SafeAreaView style={[styles.flex]}>
      <AddressSearchModal visible={addressModal} closeAddressModal={() => setAddressModal(false)} />
      <View style={[styles.headerWrap]}>
        <TouchableOpacity onPress={() => setAddressModal(true)} style={[styles.header]}>
          <Text style={[DesignSystem.h2SB, {color: 'black', marginRight: 11}]}>
            {Address.data?.addressDong}
          </Text>
          <Icon name="menu-down" size={18} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginRight: 16}}
          onPress={() => {
            navigation.navigate('MapSearch');
          }}
        >
          <Image
            source={require('../assets/icons/searchIcon.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      </View>
      <MapWebview
        userId={DataUser.data?.userId}
        webviewRef={webviewRef}
        x={Address.data?.x}
        y={Address.data?.y}
        type={0}
      />

      <BottomSheet
        ref={storeListRef}
        snapPoints={[120, listSnapPoint]}
        handleIndicatorStyle={{width: 68, backgroundColor: '#C4C4C4'}}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={[styles.missionListTextWrap]}>
          <Text style={[DesignSystem.title3SB, {color: '#111111'}]}>내 주변 가게</Text>
        </BottomSheetView>

        {StoreList.data?.length === 0 ? (
          <View style={[DesignSystem.centerArrange, {flex: 1, marginBottom: 50}]}>
            <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 2}]}>
              주변에 가게가 없어요
            </Text>
            <Text style={[DesignSystem.body1Lt, {color: '#949494', marginBottom: 38}]}>
              빠른 시일내에 가게를 업데이트 할게요!
            </Text>

            <FastImage
              source={require('../assets/images/bobpool/cryingBobBowl.png')}
              style={{width: 164, height: 157}}
              resizeMode="contain"
            />
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
                  rate={item.rate}
                  address={item.addressStreet}
                />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{marginTop: 4}} />}
          />
        )}
      </BottomSheet>
      <StoreModal
        visible={storeModal}
        closeStoreModal={() => setStoreModal(false)}
        storeId={storeId}
      />
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
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
