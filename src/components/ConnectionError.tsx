import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {DesignSystem} from '../assets/DesignSystem';

export type ConnectionErrorProps = {
  refetch: any;
};

export const ConnectionError: FC<ConnectionErrorProps> = ({refetch}) => {
  return (
    <View style={[DesignSystem.centerArrange, {flex: 1, marginBottom: 50}]}>
      <Image source={require('../assets/images/noMission/cryingBob.png')} />
      <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 2}]}>
        연결에 실패했어요
      </Text>
      <Text style={[DesignSystem.body1Lt, {color: '#949494', marginBottom: 38}]}>
        네트워크를 확인해주세요
      </Text>
      <TouchableOpacity
        onPress={() => {
          refetch();
        }}
      >
        <Text>새로고침</Text>
      </TouchableOpacity>
    </View>
  );
};
