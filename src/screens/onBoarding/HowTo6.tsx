import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OnBoardingHeader} from '../../components/OnBoardingHeader';
import {OnBoardingNextButton} from '../../components/OnBoardingNextButton';
import {DesignSystem} from '../../assets/DesignSystem';

const HowTo5 = ({navigation, route}: Props) => {
  const [loading, setLoading] = useState(false);
  const goNext = () => {
    navigation.reset({routes: [{name: 'MainNavigator'}]});
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
      <OnBoardingHeader goBack={() => navigation.navigate('HowTo5')} pageNum={4} />
      <View style={[styles.flex, DesignSystem.centerArrange]}>
        <Text style={[DesignSystem.subtitle2, styles.obText]}>사장님이 미션성공 확인 시</Text>
        <Text style={[DesignSystem.subtitle2, styles.obText, {marginBottom: 41}]}>미션 성공!</Text>
        <View style={{height: HEIGHT * 0.597}}>
          <Image source={require('../../assets/images/onBoarding/ob6.png')} />
        </View>
      </View>
      {loading ? (
        <OnBoardingNextButton goNext={goNext} text={'밥플레이스 시작하기'} />
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

export default HowTo5;
