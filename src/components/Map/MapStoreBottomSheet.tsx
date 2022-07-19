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
}) => {
  return (
    <View>
      <FastImage source={{uri: image}} style={{height: 220}} />
      <View style={[styles.storeInfoWrap]}>
        <View style={[styles.flexRow, {justifyContent: 'space-between', marginBottom: 8}]}>
          {mission && (
            <View style={[styles.pointWrap]}>
              <Text style={[styles.storePoint]}>{point} P</Text>
            </View>
          )}

          <View style={[styles.infoWrap]}>
            <Text style={[DesignSystem.body2Lt, {color: '#616161'}]}>가게정보</Text>
            <Icon name="chevron-right" size={22} color={'#949494'} />
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
    paddingTop: 12,
    paddingBottom: 12,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointWrap: {
    backgroundColor: '#6C69FF',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 5,
    width: wp(calWidth(45)),
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeName: {
    fontFamily: 'Pretendard-Medium',
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
    color: '#FFFFFF',
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
    marginLeft: 8,
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
    lineHeight: 16,
    color: '#7D7D7D',
  },
});
