import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {useRecoilState} from 'recoil';
import {AuthStackParamList} from '../nav';
import {userToken} from '../state';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const Address = ({navigation, route}: Props) => {
  const [token, setToken] = useRecoilState(userToken);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>지도 검색</Text>
    </SafeAreaView>
  );
};

export default Address;
