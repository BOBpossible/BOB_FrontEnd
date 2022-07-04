import React, {useState} from 'react';
//prettier-ignore
import {View, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../nav/MyNavigator';
import {MyHeader} from '../components/My/MyHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyBankModal from '../modal/MyBankModal';
import MyBankFeeModal from '../modal/MyBankFeeModal';
import {DesignSystem} from '../assets/DesignSystem';

type Props = NativeStackScreenProps<MyStackParamList, 'MyChangePoint'>;

export const MyChangePoint = ({navigation, route}: Props) => {
  const [point, setPoint] = useState<number>(route.params.point);
  const [focusedPoint, setFocusedPoint] = useState(false);
  const [inputPoint, setInputPoint] = useState('');
  const [focusedName, setFocusedName] = useState(false);
  const [inputName, setInputName] = useState('');
  const [focusedAccounts, setFocusedAccounts] = useState(false);
  const [inputAccounts, setInputAccounts] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [openBankModal, setOpenBankModal] = useState(false);
  const [fillDone, setFillDone] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };
  const handleSubmit = () => {
    console.log('입금신청', inputName, inputPoint, inputAccounts);
    setFillDone(true);
  };

  return (
    <SafeAreaView style={[styles.flex, {backgroundColor: 'white'}]}>
      <MyHeader goBack={goBack} title={'포인트 전환 신청'} />
      <View style={[styles.totalWrap]}>
        <KeyboardAvoidingView
          style={[{flex: 1}]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView>
            <View style={[styles.titleNinput]}>
              <Text style={[DesignSystem.title4Md, {color: 'black'}]}>전환할 포인트</Text>
              <View style={{flexDirection: 'row-reverse', marginBottom: 2}}>
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
                  {selectedBank === '' ? '은행 선택' : selectedBank}
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
          </ScrollView>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.buttonWrap]}
          disabled={
            inputPoint !== '' && inputName !== '' && selectedBank !== '' && inputAccounts !== ''
              ? false
              : true
          }
        >
          {inputPoint !== '' && inputName !== '' && selectedBank !== '' && inputAccounts !== '' ? (
            <View style={[styles.buttonStyle, styles.activeButton]}>
              <Text style={[styles.activeButtonText]}>입금신청</Text>
            </View>
          ) : (
            <View style={[styles.buttonStyle, styles.inactiveButton]}>
              <Text style={[styles.inactiveButtonText]}>입금신청</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <MyBankModal
        visible={openBankModal}
        closeBankModal={() => setOpenBankModal(false)}
        selectedBank={selectedBank}
        setSelectedBank={(bankName: string) => setSelectedBank(bankName)}
      />
      {fillDone && (
        <MyBankFeeModal
          visible={
            inputPoint !== '' && inputName !== '' && selectedBank !== '' && inputAccounts !== ''
          }
          closeBankFeeModal={() => setFillDone(false)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  caption1Light: {
    fontSize: 12,
    fontFamily: 'Pretendard-Light',
  },
  totalWrap: {
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
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
  buttonWrap: {justifyContent: 'center', alignItems: 'center', marginBottom: 20},
  buttonStyle: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  activeButton: {backgroundColor: '#6C69FF'},
  inactiveButton: {backgroundColor: '#E8E8E8'},
  activeButtonText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    color: '#FFFFFF',
  },
  inactiveButtonText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    color: '#C8C8C8',
  },
});
