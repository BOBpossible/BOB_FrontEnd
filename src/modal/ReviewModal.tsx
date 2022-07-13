import React, {useState} from 'react';
import type {FC} from 'react';
import {Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ReviewRate} from '../components/ReviewRate';
import {ReviewWrite} from '../components/ReviewWrite';
import {DesignSystem} from '../assets/DesignSystem';
import DoneModal from './DoneModal';
import {getStores, postReview, postReviewImages} from '../api';
import {queryKey} from '../api/queryKey';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {IStoreInfo} from '../data/IStore';
import {useRecoilState} from 'recoil';
import {openModal} from '../state';

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
  const [openDoneModal, setOpenDoneModal] = useRecoilState(openModal);
  const [rating, setRating] = useState(0);
  const [showRating, setShowRating] = useState(true);
  const [reviewContent, setReviewContent] = useState('');
  const [imageUri, setImageUri] = useState<imageData[]>([]);

  const queryClient = useQueryClient();

  const reviewImageMutation = useMutation(
    (reviewId: number) => postReviewImages(imageUri, reviewId),
    {
      onSuccess(data) {
        console.log(data);
        queryClient.invalidateQueries(queryKey.STOREINFO);
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
        }
      },
    },
  );

  const DataStores = useQuery<IStoreInfo>([queryKey.STOREINFO, storeId], () => getStores(storeId));
  console.log(DataStores.data);

  const submitReview = async () => {
    await reviewMutation.mutate({
      storeId: storeId,
      content: reviewContent,
      rate: rating,
      missionId: missionId as number,
    });
    await setOpenDoneModal(true);
    // setDoneModal(true); //던모달 열기
  };
  const handleCloseAllModal = () => {
    setShowRating(true);
    setRating(0);
    setReviewContent('');
    setOpenDoneModal(false);
    // setDoneModal(false);
    closeReviewModal();
  };
  return (
    <Modal visible={visible} animationType="fade">
      <SafeAreaView style={[styles.safeView]}>
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
        {DataStores.data !== undefined && (
          <DoneModal
            visible={openDoneModal}
            closeDoneModal={handleCloseAllModal}
            category={'리뷰'}
            point={DataStores.data?.point}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
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
});
