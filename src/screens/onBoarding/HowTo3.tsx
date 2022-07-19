import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OnBoardingHeader} from '../../components/OnBoardingHeader';
import {OnBoardingNextButton} from '../../components/OnBoardingNextButton';
import {DesignSystem} from '../../assets/DesignSystem';

const HowTo3 = ({navigation, route}: Props) => {
  const [loading, setLoading] = useState(false);
  const goNext = () => {
    navigation.navigate('HowTo4');
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
      <OnBoardingHeader goBack={() => navigation.navigate('HowTo2')} pageNum={1} />
      <View style={[styles.flex, DesignSystem.centerArrange]}>
        <View style={{width: 148, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={[DesignSystem.subtitle2, styles.obText, {marginBottom: 31, textAlign: 'center'}]}
          >
            매주 3개의 미션을 확인하세요!
          </Text>
        </View>

        <Image
          source={require('../../assets/images/onBoarding/ob3.png')}
          style={{width: 237, height: 480}}
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
  obText: {
    color: '#2A2A2A',
  },
});

export default HowTo3;
