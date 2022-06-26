import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../nav/MyNavigator';
import {MyHeader} from '../components/MyHeader';

type Props = NativeStackScreenProps<MyStackParamList, 'MyInquiry'>;

export const MyInquiry = ({navigation}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.flex]}>
      <MyHeader goBack={goBack} title={'1:1 문의'} />
      <Text>MyInquiry</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});
