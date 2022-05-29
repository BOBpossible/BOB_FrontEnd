import React, {useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const CustomerLogin = () => {
  const navigation = useNavigation();
  const title = 'CustomerLogin';

  const goMain = useCallback(() => navigation.navigate('MainNavigator'), []);
  return (
    <View style={[styles.flex]}>
      <Text>{title}</Text>
      <TouchableOpacity onPress={goMain}>
        <View style={{height: 100, width: 130, borderWidth: 1}}>
          <Text>손님으로 로그인</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});

export default CustomerLogin;
