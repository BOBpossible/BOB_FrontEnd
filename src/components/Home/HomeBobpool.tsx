import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DesignSystem} from '../../assets/DesignSystem';

type HomeBobpoolType = {
  category: string;
};

export const HomeBobpool: FC<HomeBobpoolType> = ({category}) => {
  return (
    <View style={[DesignSystem.centerArrange, {marginTop: 50}]}>
      <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 2}]}>
        {category === 'NO' ? '주변에 미션이 없어요' : '대단해요!'}
      </Text>
      <Text style={[DesignSystem.body1Lt, {color: '#949494', marginBottom: 38}]}>
        {category === 'NO' ? '빠른 시일내에 미션을 업데이트 할게요!' : '모든 미션을 완료했어요!'}
      </Text>
      {category === 'NO' ? (
        <FastImage
          source={require('../../assets/images/bobpool/cryingBob.png')}
          style={{width: 159, height: 105}}
          resizeMode="contain"
        />
      ) : (
        <FastImage
          source={require('../../assets/images/bobpool/bobpoolDone.png')}
          style={{width: 263, height: 169}}
          resizeMode="contain"
        />
      )}
    </View>
  );
};
