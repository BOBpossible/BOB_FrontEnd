import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {MyReviewEach} from '../../components/My/MyReviewEach';
import {userToken} from '../../state';
import {useRecoilValue} from 'recoil';
import {customAxios} from '../../api/customAxios';
import {useQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';

const dummyMission = [
  {
    content: '냠냠굿!',
    date: '2022-07-03T11:09:37.593Z',
    images: [
      {
        imageUrl: '../../assets/images/bobpool.png',
      },
    ],
    name: '가게1',
    rate: 5,
    reply: [
      {
        date: '2022-07-03T11:09:37.593Z',
        reply: '감삼다',
        reviewReplyId: 10,
      },
    ],
    reviewId: 1,
  },
  {
    content: 'JMT!',
    date: '2022-07-03T11:09:37.593Z',
    images: [
      {
        imageUrl: '../../assets/images/bobpool.png',
      },
    ],
    name: '가게이름2',
    rate: 3,
    reply: [
      {
        date: '2022-07-03T11:09:37.593Z',
        reply: '감삼다',
        reviewReplyId: 10,
      },
    ],
    reviewId: 1,
  },
  {
    content: '와맛있다',
    date: '2022-07-03T11:09:37.593Z',
    images: [
      {
        imageUrl: '../../assets/images/bobpool.png',
      },
    ],
    name: '가게이름3',
    rate: 5,
    reply: [
      {
        date: '2022-07-03T11:09:37.593Z',
        reply: '감삼다',
        reviewReplyId: 10,
      },
    ],
    reviewId: 1,
  },
  {
    content: '굿',
    date: '2022-07-03T11:09:37.593Z',
    images: [
      {
        imageUrl: '../../assets/images/bobpool.png',
      },
    ],
    name: '가게이름4',
    rate: 5,
    reply: [
      {
        date: '2022-07-03T11:09:37.593Z',
        reply: '감삼다',
        reviewReplyId: 10,
      },
    ],
    reviewId: 1,
  },
];
export type PointsListType = {
  content: PointsListContent[];
  totalPoints: number;
};
type Props = NativeStackScreenProps<MyStackParamList, 'MyReview'>;

export const MyReview = ({navigation}: Props) => {
  const token = useRecoilValue(userToken);
  //마이페이지 - 나의 포인트 내역 조회
  const getReviewsMe = async () => {
    const {data} = await customAxios(token).get('/api/v1/reviews/me');
    return data.result;
  };
  const DataReviewList = useQuery<PointsListType>([queryKey.REVIEWLIST, token], getReviewsMe);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.flex]}>
      <MyHeader goBack={goBack} title={'리뷰 관리'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={10}
        data={dummyMission}
        renderItem={({item}) => (
          <>
            <MyReviewEach
              name={item.name}
              date={item.date}
              rate={item.rate}
              content={item.content}
              images={item.images}
              reply={item.reply}
              reviewId={item.reviewId}
            />
          </>
        )}
        ItemSeparatorComponent={() => <View style={{height: 8}} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});
