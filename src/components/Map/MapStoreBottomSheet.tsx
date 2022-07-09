import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';

export type MapStoreBottomSheetProps = {
  storeName: string;
  storeCategory: string;
  point: number;
  distance: number;
  image: {uri: string};
};

const convertDistance = (distance: number) => {
  if (distance >= 1000) {
    return `${distance / 1000}km`;
  } else {
    return `${distance}m`;
  }
};

export const MapStoreBottomSheet: FC<MapStoreBottomSheetProps> = ({
  storeName,
  storeCategory,
  point,
  distance,
  image,
}) => {
  return (
    <View>
      <FastImage source={image} style={{height: 220}} />
      <View style={[styles.storeInfoWrap]}>
        <View style={[styles.flexRow, {justifyContent: 'space-between', marginBottom: 8}]}>
          <View
            style={{
              backgroundColor: '#6C69FF',
              paddingHorizontal: 6,
              paddingVertical: 4,
              borderRadius: 10,
            }}
          >
            <Text style={[styles.storePoint]}>{point} P</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'absolute',
              top: 3,
              right: 3,
            }}
          >
            <Text style={[styles.storeInfo]}>가게정보</Text>
            <Icon name="chevron-right" size={22} />
          </View>
        </View>
        <View style={[styles.flexRow, {marginBottom: 4}]}>
          <Text style={[styles.storeName]}>{storeName}</Text>
          <Text style={[styles.storeDistance]}>{convertDistance(distance)}</Text>
        </View>
        <View style={[styles.flexRow]}>
          <Text style={[styles.storeCategory]}>{storeCategory}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  storeInfoWrap: {
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSeperate: {
    marginBottom: 11,
  },
  storeName: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '600',
    color: '#000000',
  },
  storeCategory: {
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
    fontWeight: '300',
    color: '#7D7D7D',
  },
  storePoint: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  storeInfo: {
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
    lineHeight: 22,
    color: '#616161',
  },
  storeDistance: {
    marginLeft: 8,
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
    fontWeight: '300',
    color: '#7D7D7D',
  },
  storeTime: {
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
    fontWeight: '300',
    color: '#F33F3F',
  },
  storeRate: {
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
    fontWeight: '300',
    color: '#000000',
    marginLeft: 4,
  },
  storeAddress: {fontFamily: 'Pretendard-Light', fontSize: 14, fontWeight: '300', color: '#7D7D7D'},
  rateMargin: {marginLeft: 8},
});
