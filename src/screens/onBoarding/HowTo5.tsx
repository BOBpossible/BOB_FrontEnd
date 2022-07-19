import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OnBoardingHeader} from '../../components/OnBoardingHeader';
import {OnBoardingNextButton} from '../../components/OnBoardingNextButton';
import {DesignSystem} from '../../assets/DesignSystem';

const HowTo5 = ({navigation, route}: Props) => {
  const [loading, setLoading] = useState(false);
  const goNext = () => {
    navigation.navigate('HowTo6');
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
      <OnBoardingHeader goBack={() => navigation.navigate('HowTo4')} pageNum={3} />
      <View style={[styles.flex, DesignSystem.centerArrange]}>
        <Text style={[DesignSystem.subtitle2, styles.obText]}>미션을 수행한 다음,</Text>
        <Text style={[DesignSystem.subtitle2, styles.obText, {marginBottom: 41}]}>
          사장님께 성공요청을 보내요!
        </Text>
        <View style={{height: HEIGHT * 0.597}}>
          <Image
            source={require('../../assets/images/onBoarding/ob5.png')}
            style={{width: 237, height: 480}}
            resizeMode="cover"
          />
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

export default HowTo5;
