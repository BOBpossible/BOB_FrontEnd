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
import axios from 'axios';
import {useRecoilValue} from 'recoil';
import {userToken} from '../state';
import {DesignSystem} from '../assets/DesignSystem';
import DoneModal from './DoneModal';
import {getStores} from '../api';
import {queryKey} from '../api/queryKey';
import {useQuery} from 'react-query';
import {IStoreInfo} from '../data/IStore';

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

const ReviewModal: FC<ReviewModalProps> = ({visible, closeReviewModal, storeId, openDoneModal}) => {
  const [rating, setRating] = useState(0);
  const [showRating, setShowRating] = useState(true);
  const [reviewContent, setReviewContent] = useState('');
  const [imageUri, setImageUri] = useState<imageData[]>([]);
  const [doneModal, setDoneModal] = useState(false);
  const token = useRecoilValue(userToken);
  const headers = {Authorization: `Bearer ${token}`};

  const postReviewContent = async () => {
    const data = {storeId: storeId, rate: rating, content: reviewContent};
    try {
      const response = await axios.post('https://bobpossible.shop/api/v1/reviews/me', data, {
        headers: headers,
      });
      console.log('review register:', response.data);
      return response.data.result;
    } catch (error) {
      console.log('review register:', error);
    }
  };

  const postReviewImages = async (reviewResponse: Promise<any>) => {
    var formdata = new FormData();
    imageUri.map((image) => {
      let photo;
      Platform.OS === 'ios'
        ? (photo = {
            uri: image.uri.replace('file://', ''),
            type: 'image/jpg',
            name: 'image',
          })
        : (photo = {
            uri: image.uri,
            type: 'image/jpeg',
            name: 'image',
          });
      formdata.append('reviewImage', photo);
      console.log(photo);
    });
    try {
      const response = await fetch('https://bobpossible.shop/api/v1/reviews/me/images/1', {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'},
        body: formdata,
      });
      console.log('image register:', response);
    } catch (error) {
      console.log('image register:', error);
    }
  };
  const DataStores = useQuery<IStoreInfo>(queryKey.STOREINFO, () => getStores(31));
  // console.log('DataStores', DataStores.data); //{"address": {"detail": "??", "dong": "안암동", "street": "서울 성북구 보문로14길 31", "x": 127.023872828279, "y": 37.5807545405682}, "averageRate": 0,
  // "category": "디저트", "images": [], "name": "가게5", "reviewCount": 0, "storeId": 31, "storeStatus": "OPEN"}

  const submitReview = async () => {
    const reviewResponse = postReviewContent();
    postReviewImages(reviewResponse);
    setDoneModal(true); //던모달 열기
  };
  const handleCloseAllModal = () => {
    setDoneModal(false);
    closeReviewModal();
    setShowRating(true);
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
