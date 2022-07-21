import React, {useCallback, useRef, useState} from 'react';
//prettier-ignore
import {View, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Image} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyBankModal from '../../modal/MyBankModal';
import MyBankFeeModal from '../../modal/MyBankFeeModal';
import {DesignSystem} from '../../assets/DesignSystem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';
import {useQuery} from 'react-query';
import {IgetUsersMe} from '../../data';
import {queryKey} from '../../api/queryKey';
import {getUserInfo} from '../../api';
import {CheckBoxRectangle} from '../../components/Common/CheckBoxRectangle';
import PersonalnfoModal from '../../modal/PersonalnfoModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

type Props = NativeStackScreenProps<MyStackParamList, 'MyChangePoint'>;

const BANKIMAGES = [
  {name: 'KB국민', imgSrc: require('../../assets/images/banks/1.png')},
  {name: 'IBK기업', imgSrc: require('../../assets/images/banks/2.png')},
  {name: 'NH농협', imgSrc: require('../../assets/images/banks/3.png')},
  {name: '신한', imgSrc: require('../../assets/images/banks/4.png')},
  {name: '우리', imgSrc: require('../../assets/images/banks/5.png')},
  {name: '한국시티', imgSrc: require('../../assets/images/banks/6.png')},
  {name: '토스뱅크', imgSrc: require('../../assets/images/banks/7.png')},
  {name: '카카오뱅크', imgSrc: require('../../assets/images/banks/8.png')},
  {name: 'SC제일', imgSrc: require('../../assets/images/banks/9.png')},
  {name: '하나', imgSrc: require('../../assets/images/banks/10.png')},
  {name: '대구', imgSrc: require('../../assets/images/banks/11.png')},
  {name: '경남', imgSrc: require('../../assets/images/banks/12.png')},
  {name: 'KDB산업', imgSrc: require('../../assets/images/banks/13.png')},
  {name: '우체국', imgSrc: require('../../assets/images/banks/14.png')},
  {name: '수협', imgSrc: require('../../assets/images/banks/15.png')},
  {name: '광주', imgSrc: require('../../assets/images/banks/16.png')},
  {name: 'SBI저축은행', imgSrc: require('../../assets/images/banks/17.png')},
  {name: '새마을금고', imgSrc: require('../../assets/images/banks/18.png')},
  {name: '케이뱅크', imgSrc: require('../../assets/images/banks/19.png')},
  {name: '부산', imgSrc: require('../../assets/images/banks/20.png')},
  {name: '전북', imgSrc: require('../../assets/images/banks/21.png')},
  {name: '제주', imgSrc: require('../../assets/images/banks/22.png')},
];

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
  const [consentModal, setConsentModal] = useState(false);
  const [fillDone, setFillDone] = useState(false);
  const [pointOver, setPointOver] = useState(false);
  const [notiChecked, setNotichecked] = useState(false);
  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const goBack = () => {
    navigation.goBack();
  };
  const handleSubmit = () => {
    // console.log('입금신청', inputName, inputPoint, inputAccounts);
    setFillDone(true);
  };

  const height = Dimensions.get('screen').height;
  const listSnapPoint =
    Platform.OS === 'ios' ? hp(calHeight(height - 120, true)) : hp(calHeight(height - 120));

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} pressBehavior={0} disappearsOnIndex={0} appearsOnIndex={1} />
    ),
    [],
  );

  return (
    <SafeAreaView style={[styles.flex, {backgroundColor: 'white'}]}>
      <MyHeader goBack={goBack} title={'포인트 전환 신청'} />
      <View style={[styles.totalWrap]}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View style={[styles.titleNinput]}>
            <Text style={[DesignSystem.title4Md, {color: 'black'}]}>전환할 포인트</Text>
            <View style={{flexDirection: 'row-reverse', marginBottom: 2}}>
              <Text style={[styles.myPointText]}>
                내 포인트 {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}P
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
              <TextInput
                style={[
                  styles.inputText,
                  focusedPoint ? styles.focusBorder : styles.unfocusBorder,
                  pointOver ? styles.redBorder : null,
                  {paddingRight: 32},
                ]}
                onChangeText={(text) => {
                  setInputPoint(text);
                  if (Number(text) > point || Number(text) < 5000) {
                    /////////////////////////// 확인하고싶으면 500으로두고.
                    setPointOver(true);
                  } else {
                    setPointOver(false);
                  }
                }}
                value={inputPoint}
                textAlign="right"
                onBlur={() => setFocusedPoint(false)}
                onFocus={() => setFocusedPoint(true)}
                keyboardType="number-pad"
              />
              <Text
                style={{
                  position: 'relative',
                  right: 22,
                  color: '#949494',
                  fontFamily: 'Pretendard-Light',
                  fontSize: 16,
                }}
              >
                P
              </Text>
            </View>
            <Text style={[styles.caption1Light, {color: pointOver ? 'red' : '#949494'}]}>
              포인트는 5,000P 부터 전환이 가능합니다.
            </Text>
            <Text style={[styles.caption1Light, {color: pointOver ? 'red' : '#949494'}]}>
              또한, 송금 수수료 500P가 차감됩니다.
            </Text>
          </View>
          <View style={[styles.titleNinput]}>
            <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 8}]}>예금주</Text>
            <TextInput
              style={[styles.inputText, focusedName ? styles.focusBorder : styles.unfocusBorder]}
              onChangeText={(text) => {
                setInputName(text);
              }}
              value={inputName}
              placeholder="예금주명 입력"
              placeholderTextColor="#949494"
              onBlur={() => setFocusedName(false)}
              onFocus={() => setFocusedName(true)}
            />
          </View>
          <View style={[styles.titleNinput]}>
            <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 8}]}>은행</Text>
            <TouchableOpacity
              onPress={() => {
                if (bottomSheetRef.current !== null) {
                  bottomSheetRef.current.expand();
                }
              }}
              style={[
                styles.inputText,
                styles.unfocusBorder,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}
            >
              {selectedBank === '' ? (
                <Text style={[DesignSystem.body1Lt, DesignSystem.grey8]}>은행 선택</Text>
              ) : (
                <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>{selectedBank}</Text>
              )}

              <Icon name="menu-down" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={[styles.titleNinput]}>
            <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 8}]}>
              계좌 번호
            </Text>
            <TextInput
              style={[
                styles.inputText,
                focusedAccounts ? styles.focusBorder : styles.unfocusBorder,
              ]}
              onChangeText={(text) => {
                setInputAccounts(text);
              }}
              value={inputAccounts}
              placeholder="숫자로만 입력 (-제외)"
              placeholderTextColor="#949494"
              onBlur={() => setFocusedAccounts(false)}
              onFocus={() => setFocusedAccounts(true)}
              keyboardType="number-pad"
            />
          </View>
        </KeyboardAwareScrollView>

        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 12}}>
          <CheckBoxRectangle
            title={''}
            onPress={() => setNotichecked(!notiChecked)}
            isChecked={notiChecked}
          />
          <TouchableOpacity
            style={[DesignSystem.centerArrange, {marginLeft: 10, flexDirection: 'row'}]}
            onPress={() => setConsentModal(true)}
          >
            <Text style={[DesignSystem.body2Lt, styles.title]}>계좌정보 수집 및 이용 동의</Text>
            <Icon name="menu-down" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.buttonWrap]}
          disabled={
            inputPoint !== '' &&
            inputName !== '' &&
            selectedBank !== '' &&
            inputAccounts !== '' &&
            pointOver === false &&
            notiChecked === true
              ? false
              : true
          }
        >
          {inputPoint !== '' &&
          inputName !== '' &&
          selectedBank !== '' &&
          inputAccounts !== '' &&
          pointOver === false &&
          notiChecked === true ? (
            <View style={[styles.buttonStyle, styles.activeButton]}>
              <Text style={[styles.activeButtonText]}>입금신청</Text>
            </View>
          ) : (
            <>
              <View style={[styles.buttonStyle, styles.inactiveButton]}>
                <Text style={[styles.inactiveButtonText]}>입금신청</Text>
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, listSnapPoint]}
        handleIndicatorStyle={{width: 68, backgroundColor: '#C4C4C4'}}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={{marginLeft: 16, marginBottom: 8}}>
          <Text style={[DesignSystem.title3SB, {color: '#111111'}]}>은행 선택</Text>
        </BottomSheetView>

        <BottomSheetFlatList
          data={BANKIMAGES}
          columnWrapperStyle={{justifyContent: 'space-between', marginLeft: 16, marginRight: 16}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedBank(item['name']);
                if (bottomSheetRef.current !== null) {
                  bottomSheetRef.current.close();
                }
              }}
            >
              <View
                style={[styles.banksWrap, selectedBank === item.name && styles.selectedBanksWrap]}
              >
                <Image source={item['imgSrc']} style={{marginBottom: 4}} />
                <Text style={{color: '#383838', fontFamily: 'Pretendard-Medium', fontSize: 14}}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{marginTop: 16}} />}
          numColumns={3}
        />
      </BottomSheet>

      <PersonalnfoModal
        visible={consentModal}
        closePersonalInfoModal={() => setConsentModal(false)}
      />

      <MyBankFeeModal
        visible={fillDone}
        closeBankFeeModal={() => setFillDone(false)}
        accountNumber={Number(inputAccounts)}
        bank={selectedBank}
        name={inputName}
        point={Number(inputPoint)}
      />
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
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
  },
  titleNinput: {
    marginBottom: 24,
    marginTop: 20,
  },
  myPointText: {
    marginRight: 8,
    color: '#6C69FF',
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    lineHeight: 20,
  },
  inputText: {
    alignItems: 'center',
    width: '100%',
    height: Platform.OS === 'ios' ? hp(calHeight(44, true)) : hp(calHeight(44)),
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#111111',
  },
  focusBorder: {borderColor: '#6C69FF', borderWidth: 1},
  unfocusBorder: {borderColor: '#DFDFDF', borderWidth: 1},
  redBorder: {borderColor: 'red', borderWidth: 0.5},
  buttonWrap: {justifyContent: 'center', alignItems: 'center', marginBottom: 16},
  buttonStyle: {
    width: '100%',
    height: Platform.OS === 'ios' ? hp(calHeight(56, true)) : hp(calHeight(56)),
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
  fillAlarm: {
    width: '100%',
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressToggle: {
    borderRadius: 20.5,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    width: wp(calWidth(214)),
    height: Platform.OS === 'ios' ? hp(calHeight(32, true)) : hp(calHeight(32)),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
  },
  title: {
    color: '#111111',
    marginLeft: 7,
  },
  banksWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 103,
    height: 69,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DFDFDF',
  },
  selectedBanksWrap: {
    borderColor: '#6C69FF',
    backgroundColor: '#F6F6FE',
  },
});
