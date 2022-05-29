import React, {useCallback} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const LoginOption = () => {
  const navigation = useNavigation();

  const goCustomer = useCallback(() => navigation.navigate('CustomerLogin'), [navigation]);
  const goOwner = useCallback(() => navigation.navigate('OwnerLogin'), [navigation]);
  return (
    <View style={[styles.flex]}>
      <View style={[styles.logo]}>
        <Text>미션 밥파서블</Text>
        <Text>외식하고 포인트를 쌓자!</Text>
      </View>
      <View style={[styles.optionWrap]}>
        <TouchableOpacity onPress={goCustomer}>
          <View style={[styles.optionButton]}>
            <Text>손님으로 로그인</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goOwner}>
          <View style={[styles.optionButton]}>
            <Text>사장으로 로그인</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  logo: {height: 300, justifyContent: 'center', alignItems: 'center'},
  optionWrap: {flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch'},
  optionButton: {
    height: 80,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
  },
});

export default LoginOption;
