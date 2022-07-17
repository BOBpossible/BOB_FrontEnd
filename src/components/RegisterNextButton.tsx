import React from 'react';
import type {FC} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../assets/CalculateLength';
import {DesignSystem} from '../assets/DesignSystem';
export type RegisterNextButtonProps = {
  goNext: () => void;
  disabled?: boolean;
  buttonState: number;
};

export const RegisterNextButton: FC<RegisterNextButtonProps> = ({
  goNext,
  disabled,
  buttonState,
}) => {
  return (
    <TouchableOpacity onPress={goNext} style={[styles.buttonWrap]} disabled={disabled}>
      <View
        style={[
          styles.buttonStyle,
          buttonState === 0
            ? styles.stateDisabledButton
            : buttonState === 1
            ? styles.stateNextButton
            : styles.stateFinishButton,
        ]}
      >
        <Text
          style={
            buttonState === 0
              ? [DesignSystem.grey6, DesignSystem.title2Regular]
              : [{color: 'white'}, DesignSystem.title2Regular]
          }
        >
          {buttonState === 2 ? '밥파서블 시작하기' : '다음'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrap: {justifyContent: 'center', alignItems: 'center', margin: 20},
  buttonStyle: {
    width: '100%',
    height: Platform.OS === 'ios' ? hp(calHeight(56, true)) : hp(calHeight(56)),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  stateDisabledButton: {
    backgroundColor: Colors.grey300,
  },
  stateNextButton: {backgroundColor: '#2A2A2A'},
  stateFinishButton: {backgroundColor: '#615EFF'},
});
