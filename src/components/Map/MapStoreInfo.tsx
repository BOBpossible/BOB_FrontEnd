import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type MapStoreInfoProps = {
  storeName?: string;
  storeCategory?: string;
  storeStatus?: string;
  storeRate?: number;
  storeAddress?: string;
};

const convertStatus = (status?: string) => {
  if (status === 'CLOSED') {
    return '영업종료';
  } else if (status === 'BREAK') {
    return '브레이크 타임';
  } else if (status === 'OPEN') {
    return '영업중';
  }
};

export const MapStoreInfo: FC<MapStoreInfoProps> = ({
  storeName,
  storeCategory,
  storeStatus,
  storeRate,
  storeAddress,
}) => {
  return (
    <View style={[styles.storeInfoWrap]}>
      <View style={[styles.flexRow, {marginBottom: 11}]}>
        <Text style={[styles.storeName]}>{storeName}</Text>
        <Text style={[styles.storeCategory]}>{storeCategory}</Text>
      </View>
      <View style={[styles.flexRow, {marginBottom: 9}]}>
        <Text style={[styles.storeTime]}>{convertStatus(storeStatus)}</Text>
        <View style={[styles.flexRow, {marginLeft: 8}]}>
          <Icon name="star" size={15} color={'#FFDE69'} />
          <Text style={[styles.storeRate]}>{storeRate?.toFixed(1)}</Text>
        </View>
      </View>
      <View style={[styles.flexRow]}>
        <Text style={[styles.storeAddress]}>{storeAddress}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  storeInfoWrap: {
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    paddingLeft: 21,
    paddingTop: 18,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeName: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    lineHeight: 16,
    color: '#000000',
  },
  storeCategory: {
    marginLeft: 8,
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
    lineHeight: 14,
    color: '#7D7D7D',
  },
  storeTime: {
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
    lineHeight: 14,
    color: '#F33F3F',
  },
  storeRate: {
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
    fontWeight: '300',
    color: '#000000',
    marginLeft: 4,
  },
  storeAddress: {
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
    lineHegight: 14,
    color: '#7D7D7D',
  },
});
