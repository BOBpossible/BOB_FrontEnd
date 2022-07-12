import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {MyReviewEach} from '../../components/My/MyReviewEach';
import {useInfiniteQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getReviewsMe} from '../../api';
import {IReviewsType} from '../../data';

type Props = NativeStackScreenProps<MyStackParamList, 'MyReview'>;

export const MyReview = ({navigation}: Props) => {
  const DataReviews = useInfiniteQuery<IReviewsType>([queryKey.REVIEWSME], getReviewsMe, {
    getNextPageParam: (lastPage, pages) => {
      return pages.length;
    },
  });
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#F8F8F8'}} />
      <SafeAreaView style={[styles.flex]}>
        <MyHeader goBack={goBack} title={'리뷰 관리'} />
        <FlatList
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={10}
          data={DataReviews.data?.pages}
          onEndReached={() => {
            DataReviews.fetchNextPage();
          }}
          renderItem={({item}) => (
            <>
              {/* {console.log('iiiiiiiiiiiiii', item.content)} */}
              {item.content.map((e: any, i: number) => {
                return (
                  <View key={i}>
                    <MyReviewEach
                      name={e.name}
                      date={e.date}
                      rate={e.rate}
                      content={e.content}
                      images={e.images}
                      reply={e.reply}
                      reviewId={e.reviewId}
                    />
                  </View>
                );
              })}
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
