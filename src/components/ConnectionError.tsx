import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {DesignSystem} from '../assets/DesignSystem';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../assets/CalculateLength';

export type ConnectionErrorProps = {
  refetch: any;
};

export const ConnectionError: FC<ConnectionErrorProps> = ({refetch}) => {
  return (
    <View style={[DesignSystem.centerArrange, {flex: 1, backgroundColor: '#F8F8F8'}]}>
      <Image source={require('../assets/images/noMission/cryingBob.png')} />
      <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 2, marginTop: 16}]}>
        연결에 실패했어요
      </Text>
      <Text style={[DesignSystem.body1Lt, {color: '#949494', marginBottom: 40}]}>
        네트워크를 확인해주세요
      </Text>
      <TouchableOpacity
        style={[
          DesignSystem.centerArrange,
          {
            width: wp(calWidth(145)),
            height: hp(calHeight(42)),
            backgroundColor: '#E8E8E8',
            borderRadius: 25,
          }]}
        onPress={() => {
          refetch();
        }}
      >
        <Text style={[DesignSystem.body2Lt, {color: '#111111'}]}>새로고침</Text>
      </TouchableOpacity>
    </View>
  );
};
