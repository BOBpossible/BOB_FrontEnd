import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RegisterCategory = () => {
  const title = 'RegisterCategory';
  return (
    <SafeAreaView>
      <View style={[styles.backButton]}>
        <Icon name="arrow-left" size={24} color="black" />
      </View>
      <View style={{height: 40, justifyContent: 'center', alignItems: 'center'}}>
        <Text>2/2</Text>
      </View>
      <View style={[styles.flex]}>
        <Text>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  backButton: {
    position: 'absolute',
    width: 24,
    height: 24,
    left: 12,
    top: 44,
  },
});

export default RegisterCategory;
