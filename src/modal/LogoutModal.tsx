import React from 'react';
import type {FC} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../assets/CalculateLength';
import {DesignSystem} from '../assets/DesignSystem';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LogoutModalProps = {
  visible: boolean;
  closeLogoutModal: () => void;
};

const LogoutModal: FC<LogoutModalProps> = ({visible, closeLogoutModal}) => {
  const MARGINBOTTOM = Dimensions.get('screen').height / 2 - 80;
  const navigation = useNavigation();
  const handleSubmit = async () => {
    logout();
    await closeLogoutModal();
  };

  const logout = async () => {
    await AsyncStorage.multiSet([
      ['accessToken', ''],
      ['refreshToken', ''],
    ]);
    navigation.navigate('AuthNavigator');
  };

  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType="fade">
      <TouchableOpacity style={[styles.overlay]} activeOpacity={1} onPress={closeLogoutModal}>
        <View style={styles.background} />
        <TouchableWithoutFeedback>
          <View style={[styles.modalContainer, {marginBottom: MARGINBOTTOM}]}>
            <View style={{marginBottom: 20}}>
              <Text style={[styles.title1SB, {marginBottom: 12}]}>로그아웃 안내</Text>
              {/* <Text style={[DesignSystem.body1Long, DesignSystem.grey17, {marginLeft: 3}]}>
              한번 삭제하면 다음 미션까지 리뷰를 남길수 없습니다!
            </Text> */}
              <Text style={[DesignSystem.body1Long, DesignSystem.grey17]}>
                로그아웃 하시겠습니까?
              </Text>
            </View>
            <View style={[styles.buttonWrap]}>
              <TouchableOpacity
                style={[styles.buttonStyle, styles.cancelButton]}
                onPress={closeLogoutModal}
              >
                <Text style={[DesignSystem.title2Regular, DesignSystem.grey10]}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonStyle, styles.okButton]}
                onPress={handleSubmit}
              >
                <Text style={[DesignSystem.title1SB, {color: 'white'}]}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  body1Lt: {
    color: '#616161',
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
  },
  title1SB: {
    color: '#111111',
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  modalContainer: {
    width: wp(calWidth(342)),
    marginLeft: 16,
    marginRight: 17,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: wp(calWidth(145)),
    height: Platform.OS === 'ios' ? hp(calHeight(48, true)) : hp(calHeight(48)),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#949494',
  },
  okButton: {
    backgroundColor: '#6C69FF',
  },
});
