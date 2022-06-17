import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type MapStoreInfoProps = {
  storeName: string;
  storeCategory: string;
  storeTime: string;
  storeRate: number;
  storeAddress: string;
};

export const MapStoreInfo: FC<MapStoreInfoProps> = ({
  storeName,
  storeCategory,
  storeTime,
  storeRate,
  storeAddress,
}) => {
  return (
    <View style={[styles.storeInfoWrap]}>
      <View style={[styles.flexRow, styles.rowSeperate]}>
        <Text style={[styles.storeName]}>{storeName}</Text>
        <Text style={[styles.storeCategory]}>{storeCategory}</Text>
      </View>
      <View style={[styles.flexRow, styles.rowSeperate]}>
        <Text style={[styles.storeTime]}>{storeTime}</Text>
        <View style={[styles.flexRow, styles.rateMargin]}>
          <Icon name="star" size={14} color={'#6C69FF'} />
          <Text style={[styles.storeRate]}>{storeRate}</Text>
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
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    paddingLeft: 21,
    paddingTop: 18,
    paddingBottom: 18,
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
    fontWeight: '600',
    color: '#000000',
  },
  storeCategory: {
    marginLeft: 8,
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
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
