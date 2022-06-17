import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {MapStoreReview} from './MapStoreReview';

const dummyReviews = [
  {
    name: '박성호',
    date: '2022-06-16',
    rate: 3,
    images: [
      {uri: 'https://source.unsplash.com/1024x768/?tree'},
      {uri: 'https://source.unsplash.com/1024x768/?girl'},
      {uri: 'https://source.unsplash.com/1024x768/?boy'},
    ],
    review:
      '너무 맛있어요! 최고! 포인트도 낭낭하니 많아요~~~ 추천추천 미션밥파서블 덕분에 인생폈다',
  },
  {
    name: '이아영',
    date: '2022-06-14',
    rate: 3,
    images: [{uri: 'https://source.unsplash.com/1024x768/?tree'}],
    review:
      '너무 맛있어요! 최고! 너무 맛있어요! 최고!너무 맛있어요! 최고!너무 맛있어요! 최고!너무 맛있어요! 최고!',
  },
  {
    name: '이예진',
    date: '2022-06-13',
    rate: 3,
    images: [
      {uri: 'https://source.unsplash.com/1024x768/?girl'},
      {uri: 'https://source.unsplash.com/1024x768/?boy'},
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
      {uri: 'https://source.unsplash.com/1024x768/?tree'},
      {uri: 'https://source.unsplash.com/1024x768/?girl'},
      {uri: 'https://source.unsplash.com/1024x768/?boy'},
    ],
    review: '너무 맛있어요! 최고!',
  },
];

export const MapStoreReviewList = () => {
  return (
    <View style={[styles.reviewListWrap]}>
      <FlatList
        data={dummyReviews}
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
    </View>
  );
};

const styles = StyleSheet.create({
  reviewListWrap: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});
