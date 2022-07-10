import React, {useRef, useState} from 'react';
import type {FC} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  MapStoreInfo,
  MapReviewToggleButton,
  MapStoreReviewList,
  MapStoreReviewPhoto,
} from '../components';
import ReviewModal from './ReviewModal';
import {useStyle} from '../hooks';
import {ImageSwiper} from '../components/Common/ImageSwiper';
import {useInfiniteQuery, useQuery} from 'react-query';
import {queryKey} from '../api/queryKey';
import {getStoreData, getStoreReviewImages} from '../api/store';
import {IStoreData} from '../data';

type StoreModalProps = {
  storeId: number;
  visible: boolean;
  closeStoreModal: () => void;
};

const StoreModal: FC<StoreModalProps> = ({storeId, visible, closeStoreModal}) => {
  const [isReview, setIsReview] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const openReviewModal = async () => {
    setReviewModal(true);
  };

  const storeData = useQuery<IStoreData>([queryKey.STOREDATA, storeId], () =>
    getStoreData(storeId),
  );

  const offset1 = useRef(new Animated.Value(0)).current;
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
            <ImageSwiper height={220} imageList={storeData.data?.images} />
            <MapStoreInfo
              storeName={storeData.data?.name}
              storeCategory={storeData.data?.category}
              storeStatus={storeData.data?.storeStatus}
              storeRate={storeData.data?.averageRate}
              storeAddress={storeData.data?.address.street}
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
          {isReview ? <MapStoreReviewList /> : <MapStoreReviewPhoto storeId={storeId} />}
        </Animated.ScrollView>
        {isReview && (
          <TouchableOpacity onPress={() => openReviewModal()}>
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
