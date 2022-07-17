import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import {DesignSystem} from '../assets/DesignSystem';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../assets/CalculateLength';

export type CategoryItemProps = {
  onPress: () => void;
  title: string;
  isSelected: boolean;
};

export const CategoryItem: FC<CategoryItemProps> = ({onPress, title, isSelected}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.categoryItems, isSelected ? styles.selected : styles.notSelected]}>
        <Text
          style={
            isSelected
              ? [DesignSystem.title4Md, DesignSystem.purple5]
              : [DesignSystem.body1Lt, DesignSystem.grey10]
          }
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItems: {
    width: wp(calWidth(105)),
    height: Platform.OS === 'ios' ? hp(calHeight(56, true)) : hp(calHeight(56)),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 16,
  },
  selected: {borderColor: '#6C69FF', backgroundColor: '#F6F6FE'},
  notSelected: {borderColor: '#DFDFDF'},
});
