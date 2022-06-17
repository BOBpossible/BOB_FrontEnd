import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ReviewModal from '../modal/ReviewModal';
import {MapStoreReview} from './MapStoreReview';

const dummyReviews = [
  {
    name: '박성호',
    date: '2022-06-16',
    rate: 3,
    images: [
      {uri: 'https://source.unsplash.com/1024x768/?tree', id: 0},
      {uri: 'https://source.unsplash.com/1024x768/?girl', id: 1},
      {uri: 'https://source.unsplash.com/1024x768/?boy', id: 2},
    ],
    review:
      '너무 맛있어요! 최고! 포인트도 낭낭하니 많아요~~~ 추천추천 미션밥파서블 덕분에 인생폈다',
  },
  {
    name: '이아영',
    date: '2022-06-14',
    rate: 3,
    images: [{uri: 'https://source.unsplash.com/1024x768/?tree', id: 3}],
    review:
      '너무 맛있어요! 최고! 너무 맛있어요! 최고!너무 맛있어요! 최고!너무 맛있어요! 최고!너무 맛있어요! 최고!',
  },
  {
    name: '이예진',
    date: '2022-06-13',
    rate: 3,
    images: [
      {uri: 'https://source.unsplash.com/1024x768/?girl', id: 4},
      {uri: 'https://source.unsplash.com/1024x768/?boy', id: 5},
    ],
    review: '너무 맛있어요! 최고!',
  },
  {
    name: '박승민',
    date: '2022-06-12',
    rate: 3,
    images: [],
    review: '너무 맛있어요! 최고!',
  },
  {
    name: '김진범',
    date: '2022-06-10',
    rate: 3,
    images: [
      {uri: 'https://source.unsplash.com/1024x768/?tree', id: 6},
      {uri: 'https://source.unsplash.com/1024x768/?girl', id: 7},
      {uri: 'https://source.unsplash.com/1024x768/?boy', id: 8},
    ],
    review: '너무 맛있어요! 최고!',
  },
];

export const MapStoreReviewList = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const [storeId, setStoreId] = useState(0);

  const openReviewModal = async (id: number) => {
    await setStoreId(id);
    setReviewModal(true);
  };

  return (
    <View style={[styles.reviewListWrap]}>
      <FlatList
        data={dummyReviews}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <MapStoreReview
              name={item.name}
              date={item.date}
              rate={item.rate}
              review={item.review}
              images={item.images}
            />
          );
        }}
      />
      <ReviewModal
        visible={reviewModal}
        closeReviewModal={() => setReviewModal(false)}
        storeId={storeId}
      />
      <TouchableOpacity onPress={() => openReviewModal(0)}>
        <View style={[styles.reviewButton]}>
          <Text style={[styles.reviewButtonText]}>리뷰 남기기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewListWrap: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  reviewButton: {
    width: '80%',
    height: 56,
    backgroundColor: '#000000',
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewButtonText: {
    color: '#FFFFFF',
  },
});
