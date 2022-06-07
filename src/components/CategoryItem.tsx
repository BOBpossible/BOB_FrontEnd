import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';

export type CategoryItemProps = {
  onPress: () => void;
  title: string;
  isSelected: boolean;
};

export const CategoryItem: FC<CategoryItemProps> = ({onPress, title, isSelected}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.categoryItems, isSelected ? styles.selected : styles.notSelected]}>
        <Text style={[isSelected && styles.selectedText, styles.categoryText]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItems: {
    width: 105,
    heigth: 56,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {borderColor: '#6C69FF', backgroundColor: '#F6F6FE'},
  selectedText: {color: '#6C69FF'},
  categoryText: {fontSize: 16},
  notSelected: {borderColor: '#DFDFDF'},
});
