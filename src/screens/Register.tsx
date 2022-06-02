import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Register = ({navigation}) => {
  const title = 'Register';

  const goNext = () => {
    navigation.navigate('RegisterCategory');
  };

  return (
    <View style={[styles.flex]}>
      <View style={[styles.flex, {height: '100%'}]}>
        <Text>{title}</Text>
      </View>
      <TouchableOpacity onPress={goNext}>
        <View style={{width: '100%', height: 90, backgroundColor: '#615EFF'}}>
          <Text>다음</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});

export default Register;
