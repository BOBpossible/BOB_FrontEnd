import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterNextButton} from '../components';
import {createRegister} from '../data/createRegister';
import {RegisterInterface} from '../data/RegisterInterface';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../nav';
import {RegisterHeader, CheckBox} from '../components';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const Register = ({navigation, route}: Props) => {
  const [registerData, setRegisterData] = useState<RegisterInterface>(createRegister);
  const [checkAll, setCheckAll] = useState(false);
  const [check14, setCheck14] = useState(false);
  const [checkService, setCheckService] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);
  const [checkLocation, setCheckLocation] = useState(false);
  const [checkMarketing, setCheckMarketing] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  console.log(route);
  useEffect(() => {
    if (route.params !== undefined) {
      setRegisterData(route.params.registerData);
    }
  }, []);

  useEffect(() => {
    if (checkPrivacy && checkService && check14) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    if (checkPrivacy && checkService && check14 && checkLocation && checkMarketing) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [checkPrivacy, checkService, check14, checkLocation, checkMarketing]);

  const goNext = () => {
    navigation.navigate('RegisterForm', {registerData});
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={goBack} pageNum={0} />
      <View style={[styles.flex, styles.CheckBoxWrap]}>
        <View style={[styles.RegisterHeadWrap]}>
          <Text style={[styles.RegisterHeadText]}>서비스 이용 동의</Text>
        </View>
        <View>
          <CheckBox
            onPress={() => {
              setCheckAll(!checkAll);
              setCheck14(!checkAll);
              setCheckService(!checkAll);
              setCheckPrivacy(!checkAll);
              setCheckLocation(!checkAll);
              setCheckMarketing(!checkAll);
              setRegisterData({
                ...registerData,
                overAge14: !checkAll,
                serviceContract: !checkAll,
                privacyContract: !checkAll,
                locationContract: !checkAll,
                marketingContract: !checkAll,
              });
            }}
            title="약관 전체 동의"
            isChecked={checkAll}
            isCheckAll={true}
          />
        </View>
        <View style={styles.seperateLine} />
        <View>
          <CheckBox
            onPress={() => {
              setCheck14(!check14);
              setRegisterData({...registerData, overAge14: !check14});
            }}
            title="만 14세 이상입니다"
            isChecked={check14}
          />
        </View>
        <View>
          <CheckBox
            onPress={() => {
              setCheckService(!checkService);
              setRegisterData({...registerData, serviceContract: !checkService});
            }}
            title="(필수)서비스 이용약관"
            isChecked={checkService}
          />
        </View>
        <View>
          <CheckBox
            onPress={() => {
              setCheckPrivacy(!checkPrivacy);
              setRegisterData({...registerData, privacyContract: !checkPrivacy});
            }}
            title="(필수)개인 정보 처리 방침"
            isChecked={checkPrivacy}
          />
        </View>
        <View>
          <CheckBox
            onPress={() => {
              setCheckLocation(!checkLocation);
              setRegisterData({...registerData, locationContract: !checkLocation});
            }}
            title="(선택) 위치정보 제공"
            isChecked={checkLocation}
          />
        </View>
        <View>
          <CheckBox
            onPress={() => {
              setCheckMarketing(!checkMarketing);
              setRegisterData({...registerData, marketingContract: !checkMarketing});
            }}
            title="(선택) 마케팅 수신 동의"
            isChecked={checkMarketing}
          />
        </View>
      </View>
      <RegisterNextButton
        goNext={goNext}
        disabled={buttonDisabled}
        buttonState={buttonDisabled ? 0 : 1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  CheckBoxWrap: {margin: 16},
  seperateLine: {borderColor: '#E8E8E8', borderWidth: 1, marginTop: 16},
  RegisterHeadText: {fontSize: 24, fontWeight: '800'},
  RegisterHeadWrap: {paddingBottom: 8},
});

export default Register;
