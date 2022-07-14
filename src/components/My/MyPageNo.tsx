import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';

export type MyPageNoProps = {
  isPoint: boolean; // 리뷰사진1, 리뷰0
};

export const MyPageNo: FC<MyPageNoProps> = ({isPoint}) => {
  const getRandom = () => Math.floor(Math.random() * (2 - 0)); //0 or 1
  return (
    <View style={[DesignSystem.centerArrange]}>
      <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 12}]}>
        {isPoint ? '아직 포인트가 없어요' : '아직 문의 내역이 없어요'}
      </Text>
      {getRandom() ? (
        <Image source={require('../../assets/images/bobpool/cryingBob.png')} />
      ) : (
        <Image source={require('../../assets/images/bobpool/cryingBobBowl.png')} />
      )}
    </View>
  );
};
