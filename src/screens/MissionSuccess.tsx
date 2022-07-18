import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../assets/DesignSystem';

const MissionSuccess = () => {
  const navigation = useNavigation();
  const scaleAnim = new Animated.Value(1);
  const animateTextSize = (n: number) => {
    Animated.timing(scaleAnim, {
      toValue: 3,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  animateTextSize(3);

  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainNavigator'}],
    });
  };

  return (
    <SafeAreaView style={[styles.flex]}>
      <View style={[styles.flex, DesignSystem.centerArrange]}>
        <View>
          <Animated.View
            style={{
              alignItems: 'center',
              transform: [{scale: scaleAnim}],
            }}
          >
            <Image
              style={{
                width: 90,
                height: 69,
                position: 'absolute',
                top: -25,
              }}
              source={require('../assets/images/pollen.png')}
            />
          </Animated.View>
        </View>

        <ImageBackground
          style={{
            width: 110,
            height: 110,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={require('../assets/images/coin.png')}
        >
          <Text
            style={{
              fontSize: 24,
              lineHeight: 40,
              fontFamily: 'Pretendard-Semibold',
              color: 'white',
              marginBottom: 8,
            }}
          >
            500P
          </Text>
        </ImageBackground>
        <Text style={[DesignSystem.h1SB, DesignSystem.purple5, {marginTop: 40}]}>미션 성공!</Text>
        <Text style={[DesignSystem.body2Lt, DesignSystem.grey17, {marginTop: 8}]}>
          500P가 적립되었습니다.
        </Text>
      </View>
      <TouchableOpacity onPress={goHome} style={[styles.buttonWrap]}>
        <View style={[styles.buttonStyle]}>
          <Text style={[styles.buttonText]}>확인</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  blackTitleText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#111111',
    marginTop: 32,
  },
  purpleTitleText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    lineHeight: 28,
    color: '#7879F7',
    marginTop: 32,
  },
  buttonWrap: {justifyContent: 'center', alignItems: 'center', margin: 16},
  buttonStyle: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Pretendard-Medium',
    color: '#FFFFFF',
  },
});

export default MissionSuccess;
