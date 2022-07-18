import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import {MyHeader} from '../components/My/MyHeader';
import {DesignSystem} from '../assets/DesignSystem';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../assets/CalculateLength';
import {postReviewReport} from '../api';
import DoneModal from './DoneModal';

export type ReviewReportModalProps = {
  reviewId: number;
  visible: boolean;
  closeReportModal: () => void;
};
export const ReviewReportModal: FC<ReviewReportModalProps> = ({
  visible,
  closeReportModal,
  reviewId,
}) => {
  const [body, setBody] = useState('');
  const [focusedBody, setFocusedBody] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const goBack = () => {
    closeReportModal();
  };
  const handleSubmit = async () => {
    setBody('');
    await postReviewReport({reviewId: reviewId, content: body}); //리뷰 post보내기
    setDoneModal(true);
  };
  const closeDoneModal = () => {
    setDoneModal(false);
    closeReportModal();
  };
  return (
    <Modal visible={visible}>
      <SafeAreaView style={[styles.flex, {backgroundColor: '#FFFFFF'}]}>
        <MyHeader goBack={goBack} title={'신고하기'} />
        <View style={[styles.mainContainer]}>
          <View style={{flex: 1}}>
            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <ScrollView scrollEnabled={false}>
                <View style={[styles.bodyWrap]}>
                  <TextInput
                    style={[styles.bodyInput]}
                    onChangeText={(text) => {
                      setBody(text);
                    }}
                    value={body}
                    placeholder="신고 사유를 작성해주세요."
                    multiline={true}
                    selectionColor={'#6C69FF'}
                    onBlur={() => setFocusedBody(false)}
                    onFocus={() => setFocusedBody(true)}
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.buttonWrap]}
              disabled={body !== '' ? false : true}
            >
              {body !== '' ? (
                <View style={[styles.buttonStyle, styles.activeButton]}>
                  <Text style={[styles.activeButtonText]}>신고 완료</Text>
                </View>
              ) : (
                <View style={[styles.buttonStyle, styles.inactiveButton]}>
                  <Text style={[styles.inactiveButtonText]}>신고 완료</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <DoneModal visible={doneModal} closeDoneModal={closeDoneModal} category={'신고'} />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  mainContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  bodyWrap: {
    marginTop: 16,
  },
  bodyInput: {
    width: '100%',
    height: hp(calHeight(220)),
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#111111',
    alignItems: 'center',
    textAlignVertical: 'top',
  },
  buttonWrap: {justifyContent: 'center', alignItems: 'center', marginBottom: 16},
  buttonStyle: {
    width: '100%',
    height: hp(calHeight(56)),
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
