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

  const submitReview = async () => {
    const reviewResponse = postReviewContent();
    postReviewImages(reviewResponse);
    closeReviewModal();
    //던모달 열기
    openDoneModal();
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
                <Text style={[DesignSystem.title4Md, {color: '#000000'}]}>반이학생마라탕</Text>
              </View>
              <View style={[styles.backButton, {opacity: 0}]}>
                <Icon name="arrow-left" size={24} color="black" />
              </View>
            </>
          )}
        </View>
        {showRating ? (
          <ReviewRate
            name={'마라탕'}
            rating={rating}
            setRating={setRating}
            storeId={storeId}
            goNext={() => setShowRating(false)}
          />
        ) : (
          <ReviewWrite
            name={'마라탕'}
            submitReview={submitReview}
            setRating={setRating}
            rating={rating}
            imageUri={imageUri}
            setImageUri={setImageUri}
            reviewContent={reviewContent}
            setReviewContent={setReviewContent}
          />
        )}
        <DoneModal
          visible={doneModal}
          closeDoneModal={() => setDoneModal(false)}
          category={'리뷰'}
          point={100} //서버 받아서 수정 ---------------------------------------------!
        />
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
