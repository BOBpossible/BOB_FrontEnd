import React from 'react';
import {StyleSheet, Image, ScrollView, SafeAreaView, View} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';
import {MyHeader} from '../../components/My/MyHeader';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';

const HowToLong = ({navigation}: any) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex]}>
        <MyHeader goBack={goBack} title={'사용방법'} />
        <View style={[styles.flex]}>
          <ScrollView contentContainerStyle={[DesignSystem.centerArrange, {paddingTop: 10}]}>
            <Image
              source={require('../../assets/images/howto.png')}
              style={{width: wp(calWidth(330)), height: hp(calHeight(1800, true))}}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
});

export default HowToLong;
