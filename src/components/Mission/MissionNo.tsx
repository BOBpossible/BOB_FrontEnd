import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
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
      <Text style={[DesignSystem.body1Lt, {color: '#94949', marginBottom: 38}]}>
        {'홈화면에서 미션을 도전 해보세요 :)'}
      </Text>
      {progressnow === 0 ? (
        <Image source={require('../../assets/images/noMission/cryingBob.png')} />
      ) : (
        <Image source={require('../../assets/images/noMission/steamingBob.png')} />
      )}
    </View>
  );
};
