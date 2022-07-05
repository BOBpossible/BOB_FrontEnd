import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OnBoardingHeader} from '../../components/OnBoardingHeader';
import {OnBoardingNextButton} from '../../components/OnBoardingNextButton';
import {DesignSystem} from '../../assets/DesignSystem';

const HowTo4 = ({navigation, route}: Props) => {
  const [loading, setLoading] = useState(false);
  const goNext = () => {
    navigation.navigate('HowTo5');
  };
  const HEIGHT = Dimensions.get('window').height;
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
      <OnBoardingHeader goBack={() => navigation.navigate('HowTo3')} />
      <View style={[styles.flex, DesignSystem.centerArrange]}>
        <Text style={[DesignSystem.subtitle2, styles.obText]}>미션 장소와 내용을 확인하고,</Text>
        <Text style={[DesignSystem.subtitle2, styles.obText, {marginBottom: 41}]}>
          미션 도전을 누르세요!
        </Text>
        <View style={{height: HEIGHT * 0.597}}>
          <Image source={require('../../assets/images/onBoarding/ob4.png')} />
        </View>
        <View style={[styles.obDotView, DesignSystem.centerArrange]}>
          <View style={[styles.obDotEach, {backgroundColor: '#D9D9D9'}]} />
          <View style={[styles.obDotEach, {backgroundColor: '#6C69FF'}]} />
          <View style={[styles.obDotEach, {backgroundColor: '#D9D9D9'}]} />
          <View style={[styles.obDotEach, {backgroundColor: '#D9D9D9'}]} />
        </View>
      </View>
      {loading ? (
        <OnBoardingNextButton goNext={goNext} text={'다음'} />
      ) : (
        <View style={{height: 56, margin: 20}} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  obText: {
    color: '#2A2A2A',
  },
  obDotView: {
    marginTop: 38,
    flexDirection: 'row',
  },
  obDotEach: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    marginLeft: 4,
    marginRight: 4,
  },
});

export default HowTo4;
