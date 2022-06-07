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
        <Text>{title}</Text>
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
});

export default RegisterCategory;
