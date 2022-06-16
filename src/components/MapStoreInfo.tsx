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
        <View style={[styles.flexRow]}>
          <Icon name="star" size={14} />
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
  storeName: {},
  storeCategory: {},
  storeTime: {},
  storeRate: {},
  storeAddress: {},
});
