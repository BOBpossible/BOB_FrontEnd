import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../nav/MyNavigator';
import {MyHeader} from '../components/MyHeader';

type Props = NativeStackScreenProps<MyStackParamList, 'MyPoint'>;

export const MyPoint = ({navigation}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.flex]}>
      <MyHeader goBack={goBack} title={'내 포인트'} />
      <Text>내포인트</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});
