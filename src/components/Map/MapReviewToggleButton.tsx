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
          <Text>
            <Text style={[isReview ? styles.toggleTextOn : styles.toggleTextOff]}>리뷰 </Text>
            <Text style={[isReview ? styles.togglePointTextOn : styles.togglePointTextOff]}>
              {reviewCount}
            </Text>
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
    lineHeight: 16,
    color: '#949494',
  },
  toggleTextOn: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    lineHeight: 16,
    color: '#000000',
  },
  togglePointTextOff: {
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
    lineHeight: 14,
    color: '#949494',
  },
  togglePointTextOn: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    lineHeight: 14,
    color: '#7D7D7D',
  },
});
