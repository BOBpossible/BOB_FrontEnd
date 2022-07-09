import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {MyReviewEach} from '../../components/My/MyReviewEach';
import {customAxios} from '../../api/customAxios';
import {useInfiniteQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';

type Props = NativeStackScreenProps<MyStackParamList, 'MyReview'>;
export type ReviewImagesType = {
  imageUrl: string;
};
export type ReviewReplyType = {
  date: string;
  reply: string;
  reviewReplyId: number;
};
export type ReviewsType = {
  content: string;
  date: string;
  images: ReviewImagesType[];
  name: string;
  rate: number;
  reply: ReviewReplyType[];
  reviewId: number;
};

export const MyReview = ({navigation}: Props) => {
  //마이페이지 - 나의 리뷰 내역 조회
  const getReviewsMe = async () => {
    const response = await customAxios().get('/api/v1/reviews/me', {
      params: {
        pageNumber: 0,
      },
    });
    return response;
  };
  const {isLoading, data, hasNextPage, fetchNextPage} = useInfiniteQuery(
    queryKey.REVIEWSME,
    getReviewsMe,
    {
      getNextPageParam: (lastPage, _allPages) => {
        if (!lastPage.data.result.last) return lastPage.data.point.pageable.pageNumber + 1; //다음 페이지를 호출할 때 사용 될 pageParam
        return undefined;
      },
    },
  );
  // console.log('받아온데이터', data?.pages[0].data.result.content);
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#F8F8F8'}} />
      <SafeAreaView style={[styles.flex]}>
        <MyHeader goBack={goBack} title={'리뷰 관리'} />
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={10}
          data={data?.pages[0].data.result.content}
          onEndReached={loadMore}
          onEndReachedThreshold={0.8}
          renderItem={({item}) => (
            <>
              <MyReviewEach
                name={item.name}
                date={item.date}
                rate={item.rate}
                content={item.content}
                images={item.images} //더미없어서 못보냄
                reply={item.reply}
                reviewId={item.reviewId}
              />
            </>
          )}
          ItemSeparatorComponent={() => <View style={{height: 8}} />}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});
