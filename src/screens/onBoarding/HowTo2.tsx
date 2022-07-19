import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterHeader, RegisterNextButton} from '../../components';
import {OnBoardingHeader} from '../../components/OnBoardingHeader';
import {OnBoardingNextButton} from '../../components/OnBoardingNextButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

const HowTo2 = ({navigation, route}: Props) => {
  const [loading, setLoading] = useState(false);
  const goNext = () => {
    navigation.navigate('HowTo3');
  };
  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, []);
  return (
    <SafeAreaView style={[styles.flex]}>
      <OnBoardingHeader goBack={() => navigation.navigate('HowTo1')} />
      <View style={[styles.flex, DesignSystem.centerArrange]}>
        <Image
          source={require('../../assets/images/onBoarding/obText2.png')}
          style={{width: 309, height: 106}}
          resizeMode="cover"
        />
        <Image
          source={require('../../assets/images/onBoarding/obBob2.png')}
          style={{width: 238, height: 235}}
          resizeMode="cover"
        />
      </View>
      {loading ? (
        <OnBoardingNextButton goNext={goNext} text={'사용방법 알아보기'} />
      ) : (
        <View style={{height: 56, margin: 20}} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
});

export default HowTo2;
