import React, {useState} from 'react';
//prettier-ignore
import {View, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../nav/MyNavigator';
import {MyHeader} from '../components/My/MyHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyBankModal from '../modal/MyBankModal';

type Props = NativeStackScreenProps<MyStackParamList, 'MyChangePoint'>;

export const MyChangePoint = ({navigation, route}: Props) => {
  const [point, setPoint] = useState<number>(route.params.point);
  const [focusedPoint, setFocusedPoint] = useState(false);
  const [inputPoint, setInputPoint] = useState('');
  const [focusedName, setFocusedName] = useState(false);
  const [inputName, setInputName] = useState('');
  const [focusedAccounts, setFocusedAccounts] = useState(false);
  const [inputAccounts, setInputAccounts] = useState('');

  const goBack = () => {
    navigation.goBack();
  };
  const [openBankModal, setOpenBankModal] = useState(false);
  return (
    <SafeAreaView style={[styles.flex, {backgroundColor: 'white'}]}>
      <MyHeader goBack={goBack} title={'포인트 전환 신청'} />
      <View style={[styles.totalWrap]}>
        <View style={[styles.titleNinput]}>
          <Text style={[styles.title4Md]}>전환할 포인트</Text>
          <View style={{flexDirection: 'row-reverse'}}>
            <Text style={{marginRight: 8,color: '#6C69FF',fontFamily: 'Pretendard-Regular',fontSize: 12}}>
              내 포인트 {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}P
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
            <TextInput
              style={[
                styles.inputText,
                focusedPoint ? styles.focusBorder : styles.unfocusBorder,
                {paddingRight: 32},
              ]}
              onChangeText={(text) => {
                setInputPoint(text);
              }}
              value={inputPoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              textAlign="right"
              onBlur={() => setFocusedPoint(false)}
              onFocus={() => setFocusedPoint(true)}
            />
            <Text style={{position: 'relative', right: 22, color: '#949494', fontFamily: 'Pretendard-Light', fontSize: 16}}>
              원
            </Text>
          </View>
          <Text style={[styles.caption1Light, {color: '#949494'}]}>
            포인트는 5000P 부터 5,000원 단위로 전환 가능합니다.
          </Text>
          <Text style={[styles.caption1Light]}>또한, 송금 수수료 500P가 차감됩니다.</Text>
        </View>
        <View style={[styles.titleNinput]}>
          <Text style={[styles.title4Md, {marginBottom: 8}]}>예금주</Text>
          <TextInput
            style={[styles.inputText, focusedName ? styles.focusBorder : styles.unfocusBorder]}
            onChangeText={(text) => {
              setInputName(text);
            }}
            value={inputName}
            placeholder="예금주명 입력"
            onBlur={() => setFocusedName(false)}
            onFocus={() => setFocusedName(true)}
          />
        </View>
        <View style={[styles.titleNinput]}>
          <Text style={[styles.title4Md, {marginBottom: 8}]}>은행</Text>
          <TouchableOpacity
            onPress={() => setOpenBankModal(true)}
            style={[
              styles.inputText,
              styles.unfocusBorder,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}
          >
            <Text style={{color: '#949494', fontFamily: 'Pretendard-Light', fontSize: 16}}>
              은행 선택
            </Text>
            <Icon name="menu-down" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.titleNinput]}>
          <Text style={[styles.title4Md, {marginBottom: 8}]}>계좌 번호</Text>
          <TextInput
            style={[styles.inputText, focusedAccounts ? styles.focusBorder : styles.unfocusBorder]}
            onChangeText={(text) => {
              setInputAccounts(text);
            }}
            value={inputAccounts}
            placeholder="숫자로만 입력 (-제외)"
            onBlur={() => setFocusedAccounts(false)}
            onFocus={() => setFocusedAccounts(true)}
          />
        </View>
      </View>
      <MyBankModal visible={openBankModal} closeBankModal={() => setOpenBankModal(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  title4Md: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
  },
  caption1Light: {
    fontSize: 12,
    fontFamily: 'Pretendard-Light',
  },
  totalWrap: {
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  titleNinput: {
    marginBottom: 24,
  },
  inputText: {
    width: '100%',
    height: 44,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#111111',
  },
  focusBorder: {borderColor: '#6C69FF', borderWidth: 1},
  unfocusBorder: {borderColor: '#DFDFDF', borderWidth: 1},
});
