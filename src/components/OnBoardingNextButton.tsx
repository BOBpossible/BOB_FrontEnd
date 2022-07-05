import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export type OnBoardingNextButtonProps = {
  goNext: () => void;
  text: string;
};

export const OnBoardingNextButton: FC<OnBoardingNextButtonProps> = ({goNext, text}) => {
  return (
    <TouchableOpacity onPress={goNext} style={[styles.buttonWrap]}>
      <View
        style={[styles.buttonStyle, text === '다음' ? styles.blackButton : styles.purpleButton]}
      >
        <Text
          style={{fontFamily: 'Pretendard-Medium', color: 'white', fontSize: 18, lineHeight: 24}}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrap: {justifyContent: 'center', alignItems: 'center', margin: 20},
  buttonStyle: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  blackButton: {
    backgroundColor: '#2A2A2A',
  },
  stateNextButton: {backgroundColor: '#2A2A2A'},
  purpleButton: {backgroundColor: '#6C69FF'},
});
