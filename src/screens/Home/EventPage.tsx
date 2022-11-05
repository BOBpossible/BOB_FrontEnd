import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';
import {MyHeader} from '../../components/My/MyHeader';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';

const EventPage = ({navigation, route}: any) => {
  const ref = useRef<ScrollView>(null);
  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    console.log('1111');
    setTimeout(() => {
      ref.current?.scrollTo({y: route.params.scroll, animated: true});
    }, 100);
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex]}>
        <MyHeader goBack={goBack} title={'11월 이벤트'} />
        <View style={[styles.flex]}>
          <ScrollView contentContainerStyle={[DesignSystem.centerArrange]} ref={ref}>
            <FastImage
              source={require('../../assets/images/events/event1.png')}
              style={{
                height: 505,
                width: '100%',
              }}
              resizeMode="contain"
            />
            <FastImage
              source={require('../../assets/images/events/event2.png')}
              style={{
                height: 897,
                width: '100%',
              }}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 16,
                marginVertical: 8,
              }}
            >
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#6C69FF',
                  paddingVertical: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
              >
                <Text style={{fontFamily: 'Pretendard-SemiBold', fontSize: 18, color: 'white'}}>
                  밥플레이스 사용방법
                </Text>
              </View>
            </TouchableOpacity>
            <FastImage
              source={require('../../assets/images/events/event3.png')}
              style={{
                height: 1643,
                width: '100%',
              }}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 16,
                marginTop: 8,
                marginBottom: 32,
              }}
            >
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#6C69FF',
                  paddingVertical: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
              >
                <Text style={{fontFamily: 'Pretendard-SemiBold', fontSize: 18, color: 'white'}}>
                  인스타그램 팔로우 하러가기!
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
});

export default EventPage;
