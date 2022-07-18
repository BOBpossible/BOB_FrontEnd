import React, {FC} from 'react';
import {Image, Platform, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DesignSystem} from '../../assets/DesignSystem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';
import {missionPage} from '../../state';
import {useRecoilValue} from 'recoil';

export const MissionNo = () => {
  const progressnow = useRecoilValue(missionPage);
  return (
    <View style={[DesignSystem.centerArrange, {flex: 1, marginBottom: 50}]}>
      <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 2}]}>
        {progressnow ? '진행중인 미션이 없어요!' : '완료한 미션이 없어요!'}
      </Text>
      <Text style={[DesignSystem.body1Lt, {color: '#949494', marginBottom: 38}]}>
        {'홈화면에서 미션을 도전 해보세요 :)'}
      </Text>
      {progressnow ? (
        Platform.OS === 'ios' ? (
          <FastImage
            source={require('../../assets/images/bobpool/cryingBob.png')}
            style={{width: wp(calWidth(159)), height: hp(calHeight(105))}}
          />
        ) : (
          <Image source={require('../../assets/images/bobpool/cryingBob.png')} />
        )
      ) : Platform.OS === 'ios' ? (
        <FastImage
          source={require('../../assets/images/bobpool/steamingBob.png')}
          style={{width: wp(calWidth(159)), height: hp(calHeight(105))}}
        />
      ) : (
        <Image source={require('../../assets/images/bobpool/steamingBob.png')} />
      )}
    </View>
  );
};
