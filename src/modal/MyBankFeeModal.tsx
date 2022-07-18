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
import {useMutation, useQueryClient} from 'react-query';
import {postPointsConvert} from '../api/my';
import {DesignSystem} from '../assets/DesignSystem';
import {queryKey} from '../api/queryKey';

type MyBankFeeModalProps = {
  visible: boolean;
  closeBankFeeModal: () => void;
  accountNumber: number;
  bank: string;
  name: string;
  point: number;
};

//prettier-ignore
const MyBankModal: FC<MyBankFeeModalProps> = ({visible, closeBankFeeModal, accountNumber, bank, name, point}) => {
  const MARGINBOTTOM = Dimensions.get('screen').height / 2 - 80;
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const questionMutation = useMutation(
    (data: {accountNumber: number; bank: string; name: string; point: number}) =>
      postPointsConvert(data),
    {
      onSuccess: (data) => {
        console.log('입금신청 성공: ', data);
        queryClient.invalidateQueries('userInfo');
        queryClient.invalidateQueries(queryKey.POINTSLIST);
      },
      onError: (err) => {
        console.log('입금신청 실패: ', err);
      },
    },
  );

  const handleSubmit = async () => {
    await questionMutation.mutate({
      accountNumber: accountNumber,
      bank: bank,
      name: name,
      point: point,
    });
    await closeBankFeeModal();
    navigation.navigate('MyChangePointDone');
  };
  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType="fade">
      <View style={[styles.overlay]}>
        <TouchableWithoutFeedback onPress={closeBankFeeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View style={[styles.modalContainer, {marginBottom: MARGINBOTTOM}]}>
            <View style={{marginBottom: 20}}>
              <Text style={[styles.title1SB, {marginBottom: 12}]}>포인트 전환 안내</Text>
              <Text style={[DesignSystem.body1Long, DesignSystem.grey17, {marginLeft: 3}]}>
                •  입금 수수료 500포인트가 차감됩니다.
              </Text>
              <Text style={[DesignSystem.body1Long, DesignSystem.grey17, {marginLeft: 3}]}>
                •  입금은 심사 후 매주 수요일에 일괄 송금됩니다.
              </Text>
            </View>
            <View style={[styles.buttonWrap]}>
              <TouchableOpacity style={[styles.buttonStyle, styles.cancelButton]} onPress={closeBankFeeModal}>
                <Text style={[DesignSystem.title2Regular, DesignSystem.grey10]}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonStyle, styles.okButton]} onPress={handleSubmit}>
                <Text style={[DesignSystem.title1SB, {color: 'white'}]}>확인</Text>
              </TouchableOpacity>
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
