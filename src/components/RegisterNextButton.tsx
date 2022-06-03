import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export type RegisterNextButtonProps = {
  goNext: () => void;
};

export const RegisterNextButton: FC<RegisterNextButtonProps> = ({goNext}) => {
  return (
    <TouchableOpacity onPress={goNext} style={[styles.buttonWrap]}>
      <View style={[styles.buttonStyle]}>
        <Text style={[styles.buttonText]}>다음</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrap: {justifyContent: 'center', alignItems: 'center', margin: 20},
  buttonStyle: {
    width: '100%',
    height: 60,
    backgroundColor: '#615EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
