import React from 'react';
import {Image, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DesignSystem} from '../../assets/DesignSystem';

export const HomeMissionCompleteAll = () => {
  return (
    <View style={[DesignSystem.centerArrange, {flex: 1, marginBottom: 50}]}>
      <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 2}]}>
        주변에 미션이 없어요
      </Text>
      <Text style={[DesignSystem.body1Lt, {color: '#949494', marginBottom: 38}]}>
        빠른 시일내에 미션을 업데이트 할게요!
      </Text>
      <FastImage
        source={require('../../assets/images/noMission/cryingBob.png')}
        style={{width: 159, height: 105}}
        resizeMode="contain"
      />
    </View>
  );
};
