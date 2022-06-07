import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import type {FC} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CheckBoxProps = {
  onPress: () => void;
  title: string;
  isChecked: boolean;
  isCheckAll?: boolean;
};

export const CheckBox: FC<CheckBoxProps> = ({onPress, title, isChecked, isCheckAll}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={isChecked ? styles.markedCircle : styles.unmarkedCircle}>
          <Icon
            name="check"
            size={14}
            color="#FFFFFF"
            style={isChecked ? styles.markedCheck : styles.unmarkedCheck}
          />
        </View>
      </Pressable>
      <Text style={[styles.title, {fontWeight: isCheckAll ? '600' : '400'}]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginLeft: 16,
  },
  markedCircle: {
    width: 18,
    height: 18,
    backgroundColor: '#6C69FF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unmarkedCircle: {
    width: 18,
    height: 18,
    backgroundColor: 'transparent',
    borderRadius: 18,
    borderColor: '#DFDFDF',
    borderWidth: 2,
  },
  markedCheck: {opacity: 1},
  unmarkedCheck: {opacity: 0},
});
