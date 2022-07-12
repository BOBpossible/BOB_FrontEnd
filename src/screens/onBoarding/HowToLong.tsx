import React from 'react';
import {StyleSheet, Image, ScrollView, SafeAreaView} from 'react-native';
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

        <ScrollView
          contentContainerStyle={[DesignSystem.centerArrange, {marginTop: 32, paddingBottom: 32}]}
        >
          <Image
            source={require('../../assets/images/howto.png')}
            style={{width: wp(calWidth(343)), height: hp(calHeight(1860, true))}}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
});

export default HowToLong;
