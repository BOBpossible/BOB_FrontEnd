import React, {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';

export type goWriteProps = {
  goWrite: () => void;
};

export const MyInquiryMakeButton: FC<goWriteProps> = ({goWrite}) => {
  return (
    <View style={[styles.progressRow]}>
      <TouchableOpacity style={[styles.progressToggle]} onPress={goWrite}>
        <Text style={[DesignSystem.body1Lt, {color: 'white'}]}>문의 남기기 </Text>
        <Icon name="pencil" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
};
//
const styles = StyleSheet.create({
  progressRow: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressToggle: {
    borderRadius: 20.5,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    width: wp(calWidth(178)),
    height: hp(calHeight(41)),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
  },
});
