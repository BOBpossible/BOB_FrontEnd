import React, {FC} from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DesignSystem} from '../../assets/DesignSystem';

export type MissionNoProps = {
  progressnow: number;
};

export const MissionNo: FC<MissionNoProps> = ({progressnow}) => {
  return (
    <View style={[DesignSystem.centerArrange, {flex: 1, marginBottom: 50}]}>
      <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 2}]}>
        {progressnow === 0 ? '진행중인 미션이 없어요!' : '완료한 미션이 없어요!'}
      </Text>
      <Text style={[DesignSystem.body1Lt, {color: '#949494', marginBottom: 38}]}>
        {'홈화면에서 미션을 도전 해보세요 :)'}
      </Text>
      {progressnow === 0 ? (
        <FastImage
          source={require('../../assets/images/bobpool/cryingBob.png')}
          style={{width: 159, height: 105}}
        />
      ) : (
        <FastImage
          source={require('../../assets/images/bobpool/steamingBob.png')}
          style={{width: 159, height: 164}}
        />
      )}
    </View>
  );
};
