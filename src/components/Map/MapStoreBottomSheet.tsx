import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';
import {DesignSystem} from '../../assets/DesignSystem';

export type MapStoreBottomSheetProps = {
  storeName: string;
  storeCategory: string;
  point: number;
  distance: number;
  image: string;
  mission: boolean;
  rate: number;
  address: string;
};

const convertDistance = (distance: number) => {
  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(1)}km`;
  } else {
    return `${Math.round(distance)}m`;
  }
};

export const MapStoreBottomSheet: FC<MapStoreBottomSheetProps> = ({
  storeName,
  storeCategory,
  point,
  distance,
  image,
  mission,
  rate,
  address,
}) => {
  return (
    <View style={{flexDirection: 'row', marginHorizontal: 16}}>
      <FastImage source={{uri: image}} style={{height: 70, width: 70, borderRadius: 5}} />
      <View style={[styles.storeInfoWrap]}>
        <View style={[styles.flexRow]}>
          <Text style={[DesignSystem.h3SB, DesignSystem.grey17, {marginRight: 8}]}>
            {storeName}
          </Text>
          <Text style={[DesignSystem.body2Lt, DesignSystem.grey8]}>{storeCategory}</Text>
        </View>

        <View style={[styles.flexRow]}>
          <Text style={[DesignSystem.body2Lt, DesignSystem.grey10]}>{address}</Text>
        </View>

        <View style={[styles.flexRow, {marginBottom: 8}]}>
          {mission && (
            <View style={[styles.pointWrap]}>
              <Text style={[styles.storePoint]}>{point}P</Text>
            </View>
          )}
          <Icon name="star" size={16} color={'#FFDE69'} />
          <Text style={[DesignSystem.caption1Lt, DesignSystem.grey10, {marginLeft: 2.5}]}>
            {rate === 0 ? '리뷰없음' : rate.toFixed(1)}
          </Text>
          <View
            style={{height: 13, borderLeftColor: '#616161', borderLeftWidth: 0.5, marginLeft: 5}}
          />
          <Text style={[DesignSystem.caption1Lt, DesignSystem.grey10, styles.storeDistance]}>
            {convertDistance(distance)}
          </Text>
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
    paddingBottom: 12,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointWrap: {
    backgroundColor: '#F6F6FE',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2.5,
  },
  storeName: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    lineHeight: 16,
    color: '#111111',
  },
  storeCategory: {
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '300',
    color: '#7D7D7D',
  },
  storePoint: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    lineHeight: 12,
    color: '#6C69FF',
  },
  infoWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 3,
    right: 3,
  },
  storeDistance: {
    marginLeft: 5,
  },
});
