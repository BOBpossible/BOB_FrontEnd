import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const RegisterForm = () => {
  const title = 'RegisterForm';
  return (
    <View style={[styles.flex]}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});

export default RegisterForm;
