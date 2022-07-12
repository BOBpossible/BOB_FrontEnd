import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';
import {useNavigation} from '@react-navigation/native';

const RegisterDone = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const id = setTimeout(() => {
      navigation.navigate('HowTo1');
    }, 1500);
    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <SafeAreaView style={[styles.flex]}>
      <View style={[styles.flex, DesignSystem.centerArrange]}>
        <Icon name="check" size={71} color="#6C69FF" />
        <Text style={[DesignSystem.h1SB, {color: '#7879F7', marginTop: 32}]}>가입완료</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
});

export default RegisterDone;
