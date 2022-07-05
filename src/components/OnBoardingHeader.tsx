import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../assets/DesignSystem';
import {useNavigation} from '@react-navigation/native';

export type OnBoardingHeaderProps = {
  goBack?: () => void;
};

export const OnBoardingHeader: FC<OnBoardingHeaderProps> = ({goBack}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.headerWrap]}>
      {goBack !== undefined ? (
        <TouchableOpacity onPress={goBack}>
          <View style={[styles.backButton]}>
            <Icon name="arrow-left" size={24} color="black" />
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <TouchableOpacity onPress={() => navigation.reset({routes: [{name: 'MainNavigator'}]})}>
        <Text style={[DesignSystem.body2Lt, {color: '#949494'}]}>건너뛰기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    height: 50,
  },
  backButton: {
    zIndex: 1,
    // width: 16,
    // height: 15.56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disable: {opacity: 0},
  progressText: {
    color: '#949494',
    fontSize: 16,
  },
});
