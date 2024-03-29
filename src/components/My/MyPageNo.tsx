import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';

export type MyPageNoProps = {
  isPoint: boolean; // 리뷰사진1, 리뷰0
};

export const MyPageNo: FC<MyPageNoProps> = ({isPoint}) => {
  return (
    <View style={[DesignSystem.centerArrange]}>
      <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 12}]}>
        {isPoint ? '아직 포인트가 없어요' : '아직 문의 내역이 없어요'}
      </Text>
      <Image
        source={require('../../assets/images/bobpool/cryingBobBowl.png')}
        style={{width: 164, height: 157}}
        resizeMode="contain"
      />
    </View>
  );
};
