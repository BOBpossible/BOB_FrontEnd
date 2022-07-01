import React, {FC, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const MyInquiryMakeButton = () => {
  const progressValue = useState(new Animated.Value(-15))[0]; //

  return (
    <View style={[styles.progressRow]}>
      <TouchableOpacity style={[styles.progressToggle]}>
        <Text style={[styles.buttonText]}>문의 남기기</Text>
        <Icon name="pencil" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  progressRow: {
    width: '100%',
    position: 'absolute',
    bottom: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressToggle: {
    borderRadius: 20.5,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    width: 178,
    height: 41,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Pretendard-Light',
  },
});
