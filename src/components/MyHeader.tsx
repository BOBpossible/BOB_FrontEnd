import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

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
          <Image
            source={require('../assets/images/goBack.png')} //
          />
        </View>
      </TouchableOpacity>
      <View>
        <Text style={[styles.headerText]}>{title}</Text>
      </View>
      {save !== undefined ? (
        <TouchableOpacity onPress={save}>
          <Text style={[styles.saveButton]}>저장</Text>
        </TouchableOpacity>
      ) : (
        <View></View>
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
  headerText: {
    fontSize: 17,
    color: 'black',
    marginLeft: 16,
    marginRight: 16,
    // fontWeight: '600',
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
