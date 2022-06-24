import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {PhotoModal} from '../modal/PhotoModal';
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
  const [photoModal, setPhotoModal] = useState(false);
  const [reviewPhoto, setReviewPhoto] = useState<{uri: string}>({uri: 'string'});
  const openPhotoModal = (imageSource: string) => {
    setReviewPhoto({uri: imageSource});
    setPhotoModal(true);
  };

  const renderedReviews = (data: any) => {
    return (
      <>
        {data.map((item: any, index: number) => {
          return (
            <MapStoreReview
              key={index}
              name={item.name}
              date={item.date}
              rate={item.rate}
              review={item.review}
              images={item.images}
              openPhotoModal={openPhotoModal}
            />
          );
        })}
      </>
    );
  };
  return (
    <View style={[styles.reviewListWrap]}>
      {renderedReviews(dummyReviews)}
      <PhotoModal
        imageUri={reviewPhoto}
        visible={photoModal}
        closePhotoModal={() => setPhotoModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  reviewListWrap: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});
