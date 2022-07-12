import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {PhotoModal} from '../../modal/PhotoModal';
import FastImage from 'react-native-fast-image';
import {useInfiniteQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getStoreReviewImages} from '../../api/store';
import {IStoreData, IStoreReviewImages} from '../../data';
import {MapStoreInfo} from './MapStoreInfo';
import {ImageSwiper} from '../Common/ImageSwiper';
import {MapReviewToggleButton} from './MapReviewToggleButton';
const WIDTH = Dimensions.get('window').width;
const IMAGESIZE = WIDTH / 3;

type props = {
  storeData?: IStoreData;
  isReview: boolean;
  setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
  offset: Animated.Value;
  reviewCount?: number;
};

export const MapStoreReviewPhoto = ({
  storeData,
  isReview,
  setIsReview,
  offset,
  reviewCount,
}: props) => {
  const [photoModal, setPhotoModal] = useState(false);
  const [reviewPhoto, setReviewPhoto] = useState<{uri: string}>({uri: 'string'});

  const reviewImages = useInfiniteQuery(
    [queryKey.STOREREVIEWIMAGES, storeData?.storeId],
    ({pageParam}) => getStoreReviewImages({pageParam}, storeData?.storeId),
    {
      getNextPageParam: (lastPage, pages) => {
        // console.log('페이지들:', pages.length);
        if (lastPage.data.result.last === false) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    },
  );

  const openPhotoModal = (imageSource: string) => {
    setReviewPhoto({uri: imageSource});
    setPhotoModal(true);
  };

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
      data={reviewImages.data?.pages}
      renderItem={({item}) => {
        return (
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {item.data.result.content.map((image: any, index: number) => (
              <TouchableOpacity key={index} onPress={() => openPhotoModal(image.imageUrl)}>
                <View style={{borderColor: '#FFFFFF', borderWidth: 1}}>
                  <FastImage
                    source={{uri: image.imageUrl}}
                    style={{height: IMAGESIZE - 2, width: IMAGESIZE - 2}}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      }}
      contentContainerStyle={styles.reviewPhotoWrap}
      onEndReached={() => {
        if (reviewImages.hasNextPage) {
          reviewImages.fetchNextPage();
        }
      }}
      ListFooterComponent={
        <>{reviewImages.isFetching && !reviewImages.isFetchingNextPage && <ActivityIndicator />}</>
      }
    />
  );
};

const styles = StyleSheet.create({
  reviewPhotoWrap: {
    backgroundColor: '#FFFFFF',
  },
  reviewToggleWrap: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
  },
});
