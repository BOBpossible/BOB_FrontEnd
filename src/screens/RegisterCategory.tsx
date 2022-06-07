import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegisterHeader, RegisterNextButton} from '../components';
import {RegisterInterface} from '../data';
import {AuthStackParamList} from '../nav';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterForm'>;

const RegisterCategory = ({navigation, route}: Props) => {
  const [registerData, setRegisterData] = useState<RegisterInterface>(route.params.registerData);
  const title = 'RegisterCategory';
  const goNext = () => {
    navigation.reset({routes: [{name: 'MainNavigator'}]});
  };
  const goBack = () => {
    navigation.navigate('RegisterForm', {registerData});
  };
  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={goBack} pageNum={2} />
      <View style={[styles.flex]}>
        <View style={[styles.categoryWrap]}>
          <View style={[styles.categoryHead]}>
            <Text style={[styles.categoryHeadText]}>선호하는 음식 종류를 선택해주세요!</Text>
            <Text style={[styles.categorySubHeadText]}>중복선택 가능해요!</Text>
          </View>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
        </View>
      </View>
      <RegisterNextButton goNext={goNext} buttonState={2} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  backButton: {
    position: 'absolute',
    width: 24,
    height: 24,
    left: 12,
    top: 44,
  },
  categoryWrap: {
    margin: 16,
  },
  categoryHead: {
    width: 205,
  },
  categoryHeadText: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 34,
  },
  categorySubHeadText: {
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 22,
    marginTop: 8,
    color: '#616161',
  },
});

export default RegisterCategory;
