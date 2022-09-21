import React, {useEffect} from 'react';
import type {FC} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DesignSystem} from '../assets/DesignSystem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../assets/CalculateLength';

type PersonalnfoModalProps = {
  visible: boolean;
  closePersonalInfoModal: () => void;
};

const PersonalnfoModal: FC<PersonalnfoModalProps> = ({visible, closePersonalInfoModal}) => {
  const height = Dimensions.get('screen').height - 50;
  const modalWidth = Dimensions.get('screen').width - 33;
  const insets = useSafeAreaInsets();
  const listSnapPoint = height - insets.top - 120;

  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType="fade">
      <View style={[styles.overlay]}>
        <TouchableWithoutFeedback onPress={closePersonalInfoModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View style={[styles.bottomSheetContainer, {height: listSnapPoint}]}>
          <View style={[styles.bankHeader]}>
            <Text style={[DesignSystem.title1SB, DesignSystem.grey17]}>
              개인정보 수집 및 이용 동의
            </Text>
            <TouchableOpacity onPress={closePersonalInfoModal}>
              <Text style={[styles.body1Lt, {marginRight: 16}]}>닫기</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={[styles.wrapper]}>
            <Text style={[styles.bodyText, DesignSystem.body2Lt, {marginBottom: 18}]}>
              밥플레이스는 제공하는 포인트를 현금으로 전환하기 위해 유저의 은행 계좌정보를 받아야
              합니다. 따라서 이에 본인의 동의가 필요합니다.
            </Text>
            <View style={{marginBottom: 11, height: 1, backgroundColor: '#E8E8E8'}} />
            <Text style={[DesignSystem.title4Md, {color: '#111111'}]}>
              계좌정보 수집, 이용에 관한 사항
            </Text>
            <View style={[styles.body]}>
              <View style={[styles.bodyEach]}>
                <Text style={[styles.dot]}>•</Text>
                <View style={[styles.bodyTextWrap]}>
                  <Text style={[styles.bodyText]}>수집, 이용 목적</Text>
                  <Text style={[styles.bodyText, DesignSystem.body2Lt]}>
                    포인트를 현금으로 전환하기 위한 최소 정보 수집
                  </Text>
                </View>
              </View>
              <View style={[styles.bodyEach]}>
                <Text style={[styles.dot]}>•</Text>
                <View style={[styles.bodyTextWrap]}>
                  <Text style={[styles.bodyText]}>수집, 이용 항목</Text>
                  <Text style={[styles.bodyText, DesignSystem.body2Lt]}>
                    계좌송금을 위해 필요한 계좌정보 : 계좌번호, 예금주, 은행명
                  </Text>
                </View>
              </View>
              <View style={[styles.bodyEach]}>
                <Text style={[styles.dot]}>•</Text>
                <View style={[styles.bodyTextWrap]}>
                  <Text style={[styles.bodyText]}>보유, 이용 기간</Text>
                  <Text style={[styles.bodyText, DesignSystem.body2Lt]}>
                    위 정보는 계좌 송금이 완료된 후 즉시 폐기처분한다.
                  </Text>
                </View>
              </View>
              <View style={[styles.bodyEach]}>
                <Text style={[styles.dot]}>•</Text>
                <View style={[styles.bodyTextWrap]}>
                  <Text style={[styles.bodyText]}>
                    동의를 거부할 권리 및 동의를 거부할 경우의 불이익
                  </Text>
                  <Text style={[styles.bodyText, DesignSystem.body2Lt]}>
                    계좌정보 수집, 이용에 대한 동의는 포인트를 현금으로 전환하기 위한 필수적으로
                    입력해야합니다. 동의를 거부하는 경우, 현금 전환이 불가능 합니다.{' '}
                  </Text>
                </View>
              </View>
              <View style={[styles.bodyEach]}>
                <Text style={[styles.dot]}>•</Text>
                <View style={[styles.bodyTextWrap]}>
                  <Text style={[styles.bodyText]}>계좌정보 수집, 이용 동의 여부</Text>
                  <Text style={[styles.bodyText, DesignSystem.body2Lt]}>
                    당사가 위와 같이 본인의 계좌정보를 수집, 이용하는 것에 동의합니다.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default PersonalnfoModal;

const styles = StyleSheet.create({
  wrapper: {
    width: wp(calWidth(343)),
  },
  body: {
    marginTop: hp(calHeight(11)),
    width: '90%',
    // overflow: 'scroll',
  },
  bodyEach: {
    flexDirection: 'row',
    marginBottom: hp(calHeight(30)),
  },
  dot: {
    marginLeft: 9,
    marginRight: 9,
  },
  bodyTextWrap: {
    flexDirection: 'column',
  },
  bodyText: {
    color: '#111111',
  },
  body1Lt: {
    color: '#616161',
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bankHeader: {
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
