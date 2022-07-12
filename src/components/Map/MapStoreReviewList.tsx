import React, {useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet, View} from 'react-native';
import {queryKey} from '../../api/queryKey';
import {getStoreReviewList} from '../../api/store';
import {PhotoModal} from '../../modal/PhotoModal';
import {MapStoreReview} from './MapStoreReview';
import {useInfiniteQuery} from 'react-query';
import {MapReviewToggleButton} from './MapReviewToggleButton';
import {MapStoreInfo} from '..';
import {ImageSwiper} from '../Common/ImageSwiper';
import {IStoreData, IStoreReview} from '../../data';
import {DesignSystem} from '../../assets/DesignSystem';
import {ReviewNo} from '../ReviewNo';

type props = {
  storeData?: IStoreData;
  isReview: boolean;
  setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
  offset: Animated.Value;
  reviewCount?: number;
};

export const MapStoreReviewList = ({
  storeData,
  isReview,
  setIsReview,
  offset,
  reviewCount,
}: props) => {
  const [photoModal, setPhotoModal] = useState(false);
  const [reviewPhoto, setReviewPhoto] = useState<{uri: string}>({uri: 'string'});
  const openPhotoModal = (imageSource: string) => {
    setReviewPhoto({uri: imageSource});
    setPhotoModal(true);
  };

  const reviewList = useInfiniteQuery(
    [queryKey.STOREREVIEWLIST, storeData?.storeId],
    ({pageParam}) => getStoreReviewList({pageParam}, storeData?.storeId),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data.result.last === false) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    },
  );

  //리뷰없는경우 ----------------------------
  if (reviewCount === 0) {
    return (
      <>
        <View>
          <ImageSwiper height={220} imageList={storeData?.images} />
          <PhotoModal
            imageUri={reviewPhoto}
            visible={photoModal}
            closePhotoModal={() => setPhotoModal(false)}
          />
          <MapStoreInfo
            storeName={storeData?.name}
            storeCategory={storeData?.category}
            storeStatus={storeData?.storeStatus}
            storeRate={storeData?.averageRate}
            storeAddress={storeData?.address.street}
          />
          <View style={{backgroundColor: '#F6F6FA', height: 8}} />
        </View>
        <View style={[styles.reviewToggleWrap]}>
          <MapReviewToggleButton
            toggleReview={() => setIsReview(true)}
            togglePhoto={() => setIsReview(false)}
            isReview={isReview}
            reviewCount={reviewCount}
          />
        </View>
        <View style={[DesignSystem.centerArrange, {flex: 1}]}>
          <ReviewNo isPhoto={0} />
        </View>
      </>
    );
  } else {
    return (
      <Animated.FlatList
        onScroll={(event) => {
          Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
            useNativeDriver: false,
          })(event);
        }}
        ListHeaderComponent={
          <>
            <View>
              <ImageSwiper height={220} imageList={storeData?.images} />
              <PhotoModal
                imageUri={reviewPhoto}
                visible={photoModal}
                closePhotoModal={() => setPhotoModal(false)}
              />
              <MapStoreInfo
                storeName={storeData?.name}
                storeCategory={storeData?.category}
                storeStatus={storeData?.storeStatus}
                storeRate={storeData?.averageRate}
                storeAddress={storeData?.address.street}
              />
              <View style={{backgroundColor: '#F6F6FA', height: 8}} />
            </View>
            <View style={[styles.reviewToggleWrap]}>
              <MapReviewToggleButton
                toggleReview={() => setIsReview(true)}
                togglePhoto={() => setIsReview(false)}
                isReview={isReview}
                reviewCount={reviewCount}
              />
            </View>
          </>
        }
        data={reviewList.data?.pages}
        renderItem={({item, index}) => {
          return (
            <>
              {item.data.result.content.map((review: IStoreReview, i: number) => (
                <View key={i}>
                  <MapStoreReview
                    name={review.name}
                    date={review.date}
                    rate={review.rate}
                    content={review.content}
                    images={review.images}
                    reply={review.reply}
                    reviewId={review.reviewId}
                    openPhotoModal={openPhotoModal}
                  />
                </View>
              ))}
            </>
          );
        }}
        contentContainerStyle={styles.reviewListWrap}
        onEndReached={() => {
          if (reviewList.hasNextPage) {
            reviewList.fetchNextPage();
          }
        }}
        ListFooterComponent={
          <>{reviewList.isFetching && !reviewList.isFetchingNextPage && <ActivityIndicator />}</>
        }
      />
    );
  }
};

const styles = StyleSheet.create({
  reviewListWrap: {
    backgroundColor: '#FFFFFF',
  },
  reviewToggleWrap: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
  },
});
