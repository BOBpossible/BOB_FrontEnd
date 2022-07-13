import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {DesignSystem} from '../assets/DesignSystem';

export type ReviewNoProps = {
  isPhoto: number; // 리뷰사진1, 리뷰0
};

export const ReviewNo: FC<ReviewNoProps> = ({isPhoto}) => {
  return (
    <View style={[DesignSystem.centerArrange]}>
      <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 12}]}>
        {isPhoto === 1 ? '아직 리뷰 사진이 없어요!' : '아직 리뷰가 없어요!'}
      </Text>
      <Image source={require('../assets/images/bobpool/cryingBob.png')} />
    </View>
  );
};
