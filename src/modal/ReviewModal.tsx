import React, {useState} from 'react';
import type {FC} from 'react';
import {Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ReviewRate} from '../components/ReviewRate';
import {ReviewWrite} from '../components/ReviewWrite';
import {DesignSystem} from '../assets/DesignSystem';
import {getStores, postReview, postReviewImages} from '../api';
import {queryKey} from '../api/queryKey';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {IStoreInfo} from '../data/IStore';

type ReviewModalProps = {
  storeId: number;
  visible: boolean;
  closeReviewModal: () => void;
  missionId?: number;
};
type imageData = {
  uri: string;
  type: string;
  name: string;
};

const ReviewModal: FC<ReviewModalProps> = ({visible, closeReviewModal, storeId, missionId}) => {
  const [rating, setRating] = useState(0);
  const [showRating, setShowRating] = useState(true);
  const [reviewContent, setReviewContent] = useState('');
  const [imageUri, setImageUri] = useState<imageData[]>([]);
  const [reviewDone, setReviewDone] = useState(false);

  const queryClient = useQueryClient();

  const reviewImageMutation = useMutation(
    (reviewId: number) => postReviewImages(imageUri, reviewId),
    {
      onSuccess(data) {
        console.log(data);
        queryClient.invalidateQueries(queryKey.STOREINFO);
        queryClient.invalidateQueries(queryKey.REVIEWSME);
        return queryClient.invalidateQueries(queryKey.MISSIONSCOMPLETE);
      },
      onError(err) {
        console.log(err);
      },
    },
  );

  const reviewMutation = useMutation(
    (data: {storeId: number; content: string; rate: number; missionId: number}) => postReview(data),
    {
      onSuccess(Reviewdata) {
        console.log(Reviewdata);
        if (imageUri.length !== 0) {
          reviewImageMutation.mutate(Reviewdata.result);
        } else {
          queryClient.invalidateQueries(queryKey.STOREINFO);
          return queryClient.invalidateQueries(queryKey.MISSIONSCOMPLETE);
        }
      },
    },
  );

  const DataStores = useQuery<IStoreInfo>([queryKey.STOREINFO, storeId], () => getStores(storeId));

  const submitReview = async () => {
    await reviewMutation.mutate({
      storeId: storeId,
      content: reviewContent,
      rate: rating,
      missionId: missionId as number,
    });
    setReviewDone(true);
    // setDoneModal(true); //던모달 열기
  };
  const handleCloseAllModal = () => {
    setShowRating(true);
    setRating(0);
    setReviewContent('');
    setReviewDone(false);
    // setDoneModal(false);
    closeReviewModal();
  };
  return (
    <Modal visible={visible} animationType="fade" onRequestClose={closeReviewModal}>
      <SafeAreaView style={[styles.safeView]}>
        {reviewDone ? (
          <>
            <View style={[styles.flex, DesignSystem.centerArrange]}>
              <View style={[DesignSystem.centerArrange]}>
                <Icon name="check" size={71} color="#6C69FF" />
                <Text style={[DesignSystem.h1SB, DesignSystem.purple5, {marginTop: 18}]}>
                  리뷰 등록 완료!
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleCloseAllModal} style={[styles.buttonWrap]}>
              <View style={[styles.buttonStyle]}>
                <Text style={[DesignSystem.title2Regular, {color: 'white'}]}>확인</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={[styles.modalHeader]}>
              <TouchableOpacity
                onPress={() => {
                  setRating(0);
                  setShowRating(true);
                  setImageUri([]);
                  setReviewContent('');
                  closeReviewModal();
                }}
              >
                <View style={[styles.backButton]}>
                  <Icon name={showRating ? 'close' : 'arrow-left'} size={24} color="black" />
                </View>
              </TouchableOpacity>
              {!showRating && (
                <>
                  <View>
                    <Text style={[DesignSystem.title4Md, {color: '#000000'}]}>
                      {DataStores.data !== undefined && DataStores.data.name}
                    </Text>
                  </View>
                  <View style={[styles.backButton, {opacity: 0}]}>
                    <Icon name="arrow-left" size={24} color="black" />
                  </View>
                </>
              )}
            </View>
            {DataStores.data !== undefined &&
              (showRating ? (
                <ReviewRate
                  name={DataStores.data?.name}
                  rating={rating}
                  setRating={setRating}
                  storeId={storeId}
                  goNext={() => setShowRating(false)}
                />
              ) : (
                <ReviewWrite
                  name={DataStores.data?.name}
                  submitReview={submitReview}
                  setRating={setRating}
                  rating={rating}
                  imageUri={imageUri}
                  setImageUri={setImageUri}
                  reviewContent={reviewContent}
                  setReviewContent={setReviewContent}
                />
              ))}
          </>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  safeView: {flex: 1, backgroundColor: '#FFFFFF'},
  modalHeader: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    marginLeft: 16,
    marginRight: 16,
  },
  buttonWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  buttonStyle: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Pretendard-Medium',
    color: '#FFFFFF',
  },
});
