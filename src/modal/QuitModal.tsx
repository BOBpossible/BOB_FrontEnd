import React, {useState} from 'react';
import type {FC} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {calWidth} from '../assets/CalculateLength';
import {patchQuit} from '../api/my';
import {CheckBoxRectangle} from '../components/Common/CheckBoxRectangle';
import {DesignSystem} from '../assets/DesignSystem';

type QuitModalProps = {
  visible: boolean;
  closeQuitModal: () => void;
};

const QuitModal: FC<QuitModalProps> = ({visible, closeQuitModal}) => {
  const MARGINBOTTOM = Dimensions.get('screen').height / 2 - 160;
  const navigation = useNavigation();

  const logout = async () => {
    await AsyncStorage.multiSet([
      ['accessToken', ''],
      ['refreshToken', ''],
    ]);
    navigation.navigate('AuthNavigator');
  };
  const handleSubmit = async () => {
    await patchQuit();
    await closeQuitModal();
    logout();
  };
  const [notiChecked, setNotichecked] = useState(false);
  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType="fade">
      <TouchableOpacity style={[styles.overlay]} onPress={closeQuitModal} activeOpacity={1}>
        <View style={styles.background} />

        <TouchableWithoutFeedback>
          <View style={[styles.modalContainer, {marginBottom: MARGINBOTTOM}]}>
            <View style={[styles.contentWrap]}>
              <View style={{marginBottom: 20}}>
                <Text style={[DesignSystem.title1SB, DesignSystem.grey17, {marginBottom: 12}]}>
                  회원 탈퇴 시 안내
                </Text>
                <Text style={[DesignSystem.body1Long, DesignSystem.grey17]}>
                  회원 탈퇴 시 현재까지 있는 포인트는 전부 소멸되며, 복구 불가능합니다.
                </Text>
                <Text style={[DesignSystem.body1Long, DesignSystem.grey17]}>
                  회원 탈퇴 시 개인 정보 처리 방침에 따라 탈퇴 후에도 90일간 보관되고, 90일이 지난
                  후에는 완전히 삭제됩니다.
                </Text>
              </View>
              <CheckBoxRectangle
                title={' 이 점을 인지하였으며, 탈퇴를 진행합니다.'}
                onPress={() => setNotichecked(!notiChecked)}
                isChecked={notiChecked}
              />
              <View style={[styles.buttonWrap]}>
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.cancelButton]}
                  onPress={closeQuitModal}
                >
                  <Text style={[DesignSystem.title2Regular, DesignSystem.grey10]}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={notiChecked ? false : true}
                  style={[
                    styles.buttonStyle,
                    notiChecked ? {backgroundColor: '#6C69FF'} : {backgroundColor: '#C8C8C8'},
                  ]}
                  onPress={handleSubmit}
                >
                  <Text
                    style={[
                      DesignSystem.title1SB,
                      notiChecked ? {color: 'white'} : {color: '#E8E8E8'},
                    ]}
                  >
                    확인
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default QuitModal;

const styles = StyleSheet.create({
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
    // height: hp(calHeight(226)),
    marginLeft: 16,
    marginRight: 17,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  contentWrap: {
    marginLeft: 18,
    marginRight: 18,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginVertical: 20,
  },
  buttonWrap: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: wp(calWidth(145)),
    height: 48,
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
  //
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginLeft: 16,
  },
  markedCircle: {
    width: 24,
    height: 24,
    backgroundColor: '#616161',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unmarkedCircle: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
    borderColor: '#DFDFDF',
    borderWidth: 2,
  },
  markedCheck: {opacity: 1},
  unmarkedCheck: {opacity: 0},
});
