import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type MapReviewToggleButtonProps = {
  toggleReview: () => void;
  togglePhoto: () => void;
  isReview: boolean;
  reviewCount?: number;
};

export const MapReviewToggleButton: FC<MapReviewToggleButtonProps> = ({
  toggleReview,
  togglePhoto,
  isReview,
  reviewCount,
}) => {
  return (
    <View style={[styles.ToggleWrap]}>
      <TouchableOpacity onPress={togglePhoto}>
        <View style={[isReview ? styles.toggleButtonWrapOff : styles.toggleButtonWrapOn]}>
          <Text style={[isReview ? styles.toggleTextOff : styles.toggleTextOn]}>리뷰사진</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleReview}>
        <View
          style={[
            isReview ? styles.toggleButtonWrapOn : styles.toggleButtonWrapOff,
            {marginLeft: 34},
          ]}
        >
          <Text style={[isReview ? styles.toggleTextOn : styles.toggleTextOff]}>
            리뷰 {reviewCount}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ToggleWrap: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonWrapOn: {
    height: '100%',
    width: 76,
    borderBottomColor: '#6C69FF',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonWrapOff: {
    height: '100%',
    width: 76,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTextOff: {
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
  },
  toggleTextOn: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
  },
});
