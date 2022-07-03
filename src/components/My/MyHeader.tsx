import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

export type MyHeaderProps = {
  goBack: () => void;
  title: string;
  save?: () => void;
};

export const MyHeader: FC<MyHeaderProps> = ({goBack, title, save}) => {
  return (
    <View style={[styles.headerWrap]}>
      <TouchableOpacity onPress={goBack}>
        <View style={[styles.backButton]}>
          <Icon name="arrow-left" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <View>
        <Text style={[DesignSystem.title4Md, {color: 'black'}]}>{title}</Text>
      </View>
      {save !== undefined ? (
        <TouchableOpacity onPress={save}>
          <Text style={[styles.saveButton]}>저장</Text>
        </TouchableOpacity>
      ) : (
        <View style={{opacity: 0}}>
          <Text style={[styles.saveButton]}>저장</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    height: 41,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  saveButton: {
    marginRight: 16,
    color: '#6C69FF',
    fontSize: 16,
  },
  disable: {opacity: 0},
  progressText: {
    color: '#949494',
    fontSize: 16,
  },
});
