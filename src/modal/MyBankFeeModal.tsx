import React, { useEffect } from 'react';
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
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type MyBankFeeModalProps = {
  visible: boolean;
  closeBankFeeModal: () => void;
};

const MyBankModal: FC<MyBankFeeModalProps> = ({visible, closeBankFeeModal}) => {
  const MARGINBOTTOM = Dimensions.get('screen').height / 2 - 80;

  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType="fade">
      <View style={[styles.overlay]}>
        <TouchableWithoutFeedback onPress={closeBankFeeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View style={[styles.modalContainer, {marginBottom: MARGINBOTTOM}]}>
          <View style={[styles.contentWrap]}>
            <View style={[styles.textWrap]}>
              <Text style={[styles.title1SB]}>입금신청 안내</Text>
              <Text style={[styles.body1Lt, {marginTop: 10, marginBottom: 10}]}>입금시 수수료 500포인트가 차감됩니다.</Text>
            </View>
            <View style={[styles.buttonWrap]}>
              <TouchableOpacity style={[styles.buttonStyle, styles.cancelButton]} onPress={closeBankFeeModal}>
                <Text style={{color: '#616161', fontFamily: 'Pretendard-Regular', fontSize: 16}}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonStyle, styles.okButton]}>
                <Text style={[styles.body1Lt, {color: '#FFFFFF', fontFamily: 'Pretendard-Medium', fontSize: 16}]}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MyBankModal;

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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  modalContainer: {
    width: 334,
    height: 160,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  contentWrap: {
    margin: 20,
    flexDirection: 'column',
  },
  textWrap: {

  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    width: '47%',
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
});
