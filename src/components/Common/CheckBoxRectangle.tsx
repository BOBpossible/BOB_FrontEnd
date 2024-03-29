import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import type {FC} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

type CheckBoxRectangleProps = {
  onPress: () => void;
  title: string;
  isChecked: boolean;
};

export const CheckBoxRectangle: FC<CheckBoxRectangleProps> = ({onPress, title, isChecked}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={{flexDirection: 'row'}}>
        <View style={isChecked ? styles.markedCircle : styles.unmarkedCircle}>
          <Icon
            name="check"
            size={18}
            color="#FFFFFF"
            style={isChecked ? styles.markedCheck : styles.unmarkedCheck}
          />
        </View>
        <Text style={[DesignSystem.body2Lt, styles.title]}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    // width: '100%',
    // marginLeft: 8,
  },
  title: {
    color: '#111111',
    // marginLeft: 7,
  },
  markedCircle: {
    width: 24,
    height: 24,
    backgroundColor: '#616161',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unmarkedCircle: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
    borderColor: '#DFDFDF',
    borderWidth: 2,
  },
  markedCheck: {opacity: 1},
  unmarkedCheck: {opacity: 0},
});
