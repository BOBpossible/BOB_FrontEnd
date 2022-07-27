import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

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
        <Text style={[DesignSystem.h3SB, {color: 'black'}]}>{storeName}</Text>
        <Text style={[DesignSystem.body2Lt, DesignSystem.grey8]}>{storeCategory}</Text>
      </View>
      <View style={[styles.flexRow, {marginBottom: 9}]}>
        {}
        <Text
          style={[
            DesignSystem.caption1Lt,
            storeStatus === 'OPEN' ? {color: '#6C69FF'} : {color: '#F33F3F'},
          ]}
        >
          {convertStatus(storeStatus)}
        </Text>
        <View style={[styles.flexRow, {marginLeft: 8}]}>
          <Icon name="star" size={15} color={'#FFDE69'} />
          <Text style={[DesignSystem.caption1Lt, DesignSystem.grey10]}>
            {storeRate?.toFixed(1)}
          </Text>
        </View>
      </View>
      <View style={[styles.flexRow]}>
        <Text style={[DesignSystem.body2Lt, DesignSystem.grey10]}>{storeAddress}</Text>
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
});
