import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OnBoardingHeader} from '../../components/OnBoardingHeader';
import {OnBoardingNextButton} from '../../components/OnBoardingNextButton';
import {DesignSystem} from '../../assets/DesignSystem';

const HowTo1 = ({navigation, route}: Props) => {
  const [loading, setLoading] = useState(false);
  const goNext = () => {
    navigation.navigate('HowTo2');
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
      <OnBoardingHeader goBack={() => console.log('back')} />
      <View style={[styles.flex, DesignSystem.centerArrange]}>
        <Image
          source={require('../../assets/images/onBoarding/obText1.png')}
          style={{width: 287, height: 78}}
          resizeMode="cover"
        />
        <Image
          source={require('../../assets/images/onBoarding/obBob1.png')}
          style={{width: 238, height: 235}}
          resizeMode="cover"
        />
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
});

export default HowTo1;
