import React, {useEffect, useRef, useState} from 'react';
import type {FC} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import {
  MapStoreInfo,
  MapReviewToggleButton,
  MapStoreReviewList,
  MapStoreReviewPhoto,
} from '../components';
import {ScrollView} from 'react-native-gesture-handler';
import ReviewModal from './ReviewModal';
import {useStyle} from '../hooks';

type StoreModalProps = {
  storeId: number;
  visible: boolean;
  closeStoreModal: () => void;
};

const dot = () => {
  const dotStyle = {
    backgroundColor: '#ffffffb2',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: -10,
  };
  return <View style={dotStyle} />;
};
const activeDot = () => {
  const activeDotStyle = {
    backgroundColor: '#6C69FF',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: -10,
  };
  return <View style={activeDotStyle} />;
};

const StoreModal: FC<StoreModalProps> = ({storeId, visible, closeStoreModal}) => {
  const [isReview, setIsReview] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const openReviewModal = async () => {
    setReviewModal(true);
  };
  const offset1 = useRef(new Animated.Value(0)).current;
  useEffect(() => {}, []);

  const headerTextStyle = useStyle({
    opacity: offset1.interpolate({
      inputRange: [250, 260],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  });

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={[styles.safeView]}>
        <View style={[styles.modalHeader]}>
          <TouchableOpacity onPress={closeStoreModal}>
            <View style={[styles.backButton]}>
              <Icon name="arrow-left" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <Animated.View style={[headerTextStyle]}>
            <Text style={[styles.storeHeaderText]}>반이학생마라탕</Text>
          </Animated.View>

          <View style={[styles.backButton, {opacity: 0}]}>
            <Icon name="arrow-left" size={24} color="black" />
          </View>
        </View>
        <Animated.ScrollView
          stickyHeaderIndices={[1]}
          scrollEventThrottle={10}
          onScroll={(event) => {
            Animated.event([{nativeEvent: {contentOffset: {y: offset1}}}], {
              useNativeDriver: false,
            })(event);
          }}
        >
          <View>
            <View style={{height: 220}}>
              <Swiper dot={dot()} activeDot={activeDot()} showsButtons={false}>
                <Image
                  source={{uri: 'https://source.unsplash.com/1024x768/?nature'}}
                  style={{width: '100%', height: 220}}
                />
                <Image
                  source={{uri: 'https://source.unsplash.com/1024x768/?water'}}
                  style={{width: '100%', height: 220}}
                />
                <Image
                  source={{uri: 'https://source.unsplash.com/1024x768/?girl'}}
                  style={{width: '100%', height: 220}}
                />
                <Image
                  source={{uri: 'https://source.unsplash.com/1024x768/?tree'}}
                  style={{width: '100%', height: 220}}
                />
              </Swiper>
            </View>
            <MapStoreInfo
              storeName={'반이학생마라탕마라반'}
              storeCategory={'중식당'}
              storeTime={'영업종료'}
              storeRate={4.4}
              storeAddress={'서울시 성북구 안암동5가 102-60'}
            />
            <View style={{backgroundColor: '#F6F6FA', height: 8}} />
          </View>

          <View style={[styles.reviewToggleWrap]}>
            <MapReviewToggleButton
              toggleReview={() => setIsReview(true)}
              togglePhoto={() => setIsReview(false)}
              isReview={isReview}
            />
          </View>
          {isReview ? <MapStoreReviewList /> : <MapStoreReviewPhoto />}
        </Animated.ScrollView>
        {isReview && (
          <TouchableOpacity onPress={() => openReviewModal(0)}>
            <View style={[styles.reviewButton]}>
              <Text style={[styles.reviewButtonText]}>리뷰 남기기</Text>
              <Icon name="pencil" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        )}
        <ReviewModal
          visible={reviewModal}
          closeReviewModal={() => setReviewModal(false)}
          storeId={storeId}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default StoreModal;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: '#FFFFFF'},
  modalHeader: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
  },
  backButton: {
    marginLeft: 16,
    marginRight: 16,
  },
  storeInfoWrap: {
    height: 100,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  storeHeaderText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  reviewToggleWrap: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
  },
  reviewButton: {
    width: 178,
    height: 41,
    borderRadius: 41,
    backgroundColor: '#2A2A2A',
    position: 'absolute',
    bottom: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '300',
    marginRight: 4,
  },
});
