import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterNextButton} from '../../components';
import {createRegister} from '../../data/createRegister';
import {RegisterInterface} from '../../data/Register';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../nav';
import {RegisterHeader, CheckBox} from '../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const Register = ({navigation}: Props) => {
  const [registerData, setRegisterData] = useState<RegisterInterface>(createRegister);
  const [checkAll, setCheckAll] = useState(false);
  const [check14, setCheck14] = useState(false);
  const [checkService, setCheckService] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);
  const [checkLocation, setCheckLocation] = useState(false);
  const [checkMarketing, setCheckMarketing] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  //Check disable Button and Check ALL status
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
          <Text style={[DesignSystem.h1SB, DesignSystem.grey17]}>서비스 이용 동의</Text>
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
                termsOfService: !checkAll,
                privacyPolicy: !checkAll,
                locationInfo: !checkAll,
                marketing: !checkAll,
              });
            }}
            title="약관 전체 동의"
            isChecked={checkAll}
            isCheckAll={true}
          />
        </View>
        <View style={styles.seperateLine} />
        <View style={styles.CheckBoxRow}>
          <CheckBox
            onPress={() => {
              setCheck14(!check14);
              setRegisterData({...registerData, overAge14: !check14});
            }}
            title="만 14세 이상입니다"
            isChecked={check14}
          />
        </View>
        <View style={styles.CheckBoxRow}>
          <CheckBox
            onPress={() => {
              setCheckService(!checkService);
              setRegisterData({...registerData, termsOfService: !checkService});
            }}
            title="(필수) 서비스 이용약관"
            isChecked={checkService}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterContract', {type: 0});
            }}
          >
            <Icon name="chevron-right" size={18} color="#111111" />
          </TouchableOpacity>
        </View>
        <View style={styles.CheckBoxRow}>
          <CheckBox
            onPress={() => {
              setCheckPrivacy(!checkPrivacy);
              setRegisterData({...registerData, privacyPolicy: !checkPrivacy});
            }}
            title="(필수) 개인정보 수집/이용 동의"
            isChecked={checkPrivacy}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterContract', {type: 1});
            }}
          >
            <Icon name="chevron-right" size={18} color="#111111" />
          </TouchableOpacity>
        </View>
        <View style={styles.CheckBoxRow}>
          <CheckBox
            onPress={() => {
              setCheckLocation(!checkLocation);
              setRegisterData({...registerData, locationInfo: !checkLocation});
            }}
            title="(선택) 위치정보 제공"
            isChecked={checkLocation}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterContract', {type: 2});
            }}
          >
            <Icon name="chevron-right" size={18} color="#111111" />
          </TouchableOpacity>
        </View>
        <View style={styles.CheckBoxRow}>
          <CheckBox
            onPress={() => {
              setCheckMarketing(!checkMarketing);
              setRegisterData({...registerData, marketing: !checkMarketing});
            }}
            title="(선택) 마케팅 수신 동의"
            isChecked={checkMarketing}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterContract', {type: 3});
            }}
          >
            <Icon name="chevron-right" size={18} color="#111111" />
          </TouchableOpacity>
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
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  CheckBoxWrap: {margin: 16},
  seperateLine: {borderColor: '#E8E8E8', borderBottomWidth: 1, marginTop: 16},
  RegisterHeadText: {fontSize: 24, fontWeight: '800'},
  RegisterHeadWrap: {paddingBottom: 8},
  CheckBoxRow: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
});

export default Register;
