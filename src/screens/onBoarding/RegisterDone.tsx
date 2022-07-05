import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterHeader, RegisterNextButton} from '../../components';
import axios from 'axios';
import {OnBoardingHeader} from '../../components/OnBoardingHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

const RegisterDone = ({navigation, route}: Props) => {
  const goNext = () => {
    navigation.reset({routes: [{name: 'MainNavigator'}]});
  };

  useEffect(() => {
    const id = setTimeout(() => {
      navigation.navigate('HowTo1');
    }, 1500);
    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <SafeAreaView style={[styles.flex]}>
      <OnBoardingHeader goBack={() => console.log('back')} />
      <View style={[styles.flex, DesignSystem.centerArrange]}>
        <Icon name="check" size={71} color="#6C69FF" />
        <Text style={[DesignSystem.h1SB, {color: '#7879F7', marginTop: 32}]}>가입완료</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  backButton: {
    position: 'absolute',
    width: 24,
    height: 24,
    left: 12,
    top: 44,
  },
  categoryWrap: {
    margin: 16,
  },
  categoryHead: {
    width: 205,
    marginBottom: 56,
  },
  categoryHeadText: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 34,
  },
  categorySubHeadText: {
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 22,
    marginTop: 8,
    color: '#616161',
  },
  categoryBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default RegisterDone;
