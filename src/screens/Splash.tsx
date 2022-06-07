import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native-paper';
const Splash = () => {
  const title = '미션밥파서블';
  return (
    <View style={[styles.flex]}>
      <Text style={{fontSize: 30}}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'},
});

export default Splash;
