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
import {patchDeleteReview} from '../api';

type ReviewDeleteModalProps = {
  visible: boolean;
  closeReviewDeleteModal: () => void;
  reviewId: string;
};

const ReviewDeleteModal: FC<ReviewDeleteModalProps> = ({
  visible,
  closeReviewDeleteModal,
  reviewId,
}) => {
  const queryClient = useQueryClient();
  const MARGINBOTTOM = Dimensions.get('screen').height / 2 - 80;

  const reviewDeleteMutation = useMutation(() => patchDeleteReview(reviewId), {
    onSuccess: (data) => {
      console.log('리뷰삭제 성공: ', data);
      queryClient.invalidateQueries(queryKey.STOREREVIEWLIST);
      queryClient.invalidateQueries(queryKey.REVIEWSME);
    },
  });

  const handleSubmit = async () => {
    await reviewDeleteMutation.mutate();
    await closeReviewDeleteModal();
  };
  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType="fade">
      <TouchableOpacity style={[styles.overlay]} activeOpacity={1} onPress={closeReviewDeleteModal}>
        <View style={styles.background} />
        <TouchableWithoutFeedback>
          <View style={[styles.modalContainer, {marginBottom: MARGINBOTTOM}]}>
            <View style={{marginBottom: 20}}>
              <Text style={[styles.title1SB, {marginBottom: 12}]}>리뷰 삭제 안내</Text>
              {/* <Text style={[DesignSystem.body1Long, DesignSystem.grey17, {marginLeft: 3}]}>
              한번 삭제하면 다음 미션까지 리뷰를 남길수 없습니다!
            </Text> */}
              <Text style={[DesignSystem.body1Long, DesignSystem.grey17, {marginLeft: 3}]}>
                리뷰를 삭제 하시겠습니까?
              </Text>
            </View>
            <View style={[styles.buttonWrap]}>
              <TouchableOpacity
                style={[styles.buttonStyle, styles.cancelButton]}
                onPress={closeReviewDeleteModal}
              >
                <Text style={[DesignSystem.title2Regular, DesignSystem.grey10]}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonStyle, styles.okButton]}
                onPress={handleSubmit}
              >
                <Text style={[DesignSystem.title1SB, {color: 'white'}]}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default ReviewDeleteModal;

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
