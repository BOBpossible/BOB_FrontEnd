import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native-paper';

const Splash = () => {
  const title = 'Splash';
  return (
    <View style={[styles.flex]}>
      <Text style={{fontSize: 30}}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: Colors.purple300},
});

export default Splash;
