import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

const RegisterContract = ({navigation, route}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={[styles.flex]}>
      <View style={[styles.modalHeader]}>
        <TouchableOpacity onPress={goBack}>
          <View style={[styles.backButton]}>
            <Icon name="arrow-left" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <View>
          <Text style={[styles.storeHeaderText]}>이용 약관</Text>
        </View>

        <View style={[styles.backButton, {opacity: 0}]}>
          <Icon name="arrow-left" size={24} color="black" />
        </View>
      </View>
      <ScrollView contentContainerStyle={{margin: 16}}>
        {route.params.type === 0 ? (
          <Image
            source={require('../../assets/images/contract/ServiceContract.png')}
            style={{width: 343, height: 10200}}
          />
        ) : route.params.type === 1 ? (
          <Image
            source={require('../../assets/images/contract/PrivacyContract.png')}
            style={{width: 343, height: 1108}}
          />
        ) : route.params.type === 2 ? (
          <Image
            source={require('../../assets/images/contract/MarketingContract.png')}
            style={{width: 343, height: 432}}
          />
        ) : (
          <Image
            source={require('../../assets/images/contract/LocationContract.png')}
            style={{width: 343, height: 5382}}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  modalHeader: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    marginLeft: 16,
    marginRight: 16,
  },
  storeInfoWrap: {
    height: 100,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  storeHeaderText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
});

export default RegisterContract;
