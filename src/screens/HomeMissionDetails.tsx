import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../nav/HomeNavigator';
import {MyHeader} from '../components/MyHeader';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMissionDetails'>;

export const HomeMissionDetails = ({navigation}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.flex]}>
      <MyHeader goBack={goBack} title={'미션 정보'} />
      <Text>여기 화면 디자인중</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});
