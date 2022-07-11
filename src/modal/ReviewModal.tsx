import React, {useState} from 'react';
import type {FC} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ReviewRate} from '../components/ReviewRate';
import {ReviewWrite} from '../components/ReviewWrite';
import {DesignSystem} from '../assets/DesignSystem';
import DoneModal from './DoneModal';
import {getStores, postReview, postReviewImages} from '../api';
import {queryKey} from '../api/queryKey';
import {useMutation, useQuery} from 'react-query';
import {IStoreInfo} from '../data/IStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ReviewModalProps = {
  storeId: number;
  visible: boolean;
  closeReviewModal: () => void;
  openDoneModal?: () => void;
};
type imageData = {
  uri: string;
  type: string;
  name: string;
};

const ReviewModal: FC<ReviewModalProps> = ({visible, closeReviewModal, storeId}) => {
  const [rating, setRating] = useState(0);
  const [showRating, setShowRating] = useState(true);
  const [reviewContent, setReviewContent] = useState('');
  const [imageUri, setImageUri] = useState<imageData[]>([]);
  const [doneModal, setDoneModal] = useState(false);

  const reviewImageMutation = useMutation(
    (reviewId: number) => postReviewImages(imageUri, reviewId),
    {
      onSuccess(data) {
        console.log(data);
      },
      onError(err) {
        console.log(err);
      },
    },
  );

  const reviewMutation = useMutation(
    (data: {storeId: number; content: string; rate: number}) => postReview(data),
    {
      onSuccess(data) {
        console.log(data);
        if (imageUri.length !== 0) {
          reviewImageMutation.mutate(data.result);
        }
      },
    },
  );

  // const postReviewImages = async (reviewId: number) => {
  //   const token = await AsyncStorage.getItem('accessToken');
  //   var formdata = new FormData();
  //   imageUri.map((image) => {
  //     let photo;
  //     Platform.OS === 'ios'
  //       ? (photo = {
  //           uri: image.uri.replace('file://', ''),
  //           type: 'image/jpg',
  //           name: 'image',
  //         })
  //       : (photo = {
  //           uri: image.uri,
  //           type: 'image/jpeg',
  //           name: 'image',
  //         });
  //     formdata.append('reviewImage', photo);
  //     console.log(photo);
  //   });
  //   try {
  //     const response = await fetch(
  //       `https://bobpossible.shop/api/v1/reviews/me/images/${reviewId}`,
  //       {
  //         method: 'POST',
  //         headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'},
  //         body: formdata,
  //       },
  //     );
  //     console.log('image register:', response);
  //   } catch (error) {
  //     console.log('image register:', error);
  //   }
  // };

  const DataStores = useQuery<IStoreInfo>(queryKey.STOREINFO, () => getStores(storeId));
  // console.log('DataStores', DataStores.data); //{"address": {"detail": "??", "dong": "안암동", "street": "서울 성북구 보문로14길 31", "x": 127.023872828279, "y": 37.5807545405682}, "averageRate": 0,
  // "category": "디저트", "images": [], "name": "가게5", "reviewCount": 0, "storeId": 31, "storeStatus": "OPEN"}

  const submitReview = async () => {
    await reviewMutation.mutate({storeId: storeId, content: reviewContent, rate: rating});
    setDoneModal(true); //던모달 열기
  };
  const handleCloseAllModal = () => {
    setShowRating(true);
    setDoneModal(false);
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
                  {DataStores.data !== undefined && DataStores.data?.name}
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
            visible={doneModal}
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
