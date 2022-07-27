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
  storeIntro?: string;
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
  storeIntro,
}) => {
  console.log(storeIntro);
  return (
    <View style={[styles.storeInfoWrap]}>
      <View style={[styles.flexRow, {marginBottom: 2}]}>
        <Text style={[DesignSystem.h3SB, {color: 'black', marginRight: 8}]}>{storeName}</Text>
        <Text style={[DesignSystem.body2Lt, DesignSystem.grey8]}>{storeCategory}</Text>
      </View>
      {storeIntro !== '' && (
        <View>
          <Text style={[DesignSystem.grey8, DesignSystem.body2Lt]}>"{storeIntro}"</Text>
        </View>
      )}
      <View style={[styles.flexRow]}>
        <Text style={[DesignSystem.body2Lt, DesignSystem.grey10]}>{storeAddress}</Text>
      </View>

      <View style={[styles.flexRow]}>
        <View style={[styles.flexRow]}>
          <Icon name="star" size={15} color={'#FFDE69'} />
          <Text style={[DesignSystem.caption1Lt, DesignSystem.grey10]}>
            {storeRate?.toFixed(1)}
          </Text>
          <View
            style={{
              height: 13,
              borderLeftColor: '#E8E8E8',
              borderLeftWidth: 0.5,
              marginLeft: 5,
              marginRight: 5,
            }}
          />
          <Text
            style={[
              DesignSystem.caption1Lt,
              storeStatus === 'OPEN' ? {color: '#6C69FF'} : {color: '#F33F3F'},
            ]}
          >
            {convertStatus(storeStatus)}
          </Text>
        </View>
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
