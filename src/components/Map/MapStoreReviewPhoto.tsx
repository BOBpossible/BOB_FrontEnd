import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {PhotoModal} from '../../modal/PhotoModal';
import FastImage from 'react-native-fast-image';
import {useInfiniteQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getStoreReviewImages} from '../../api/store';
import {IStoreReviewImages} from '../../data';
const WIDTH = Dimensions.get('window').width;
const IMAGESIZE = WIDTH / 3;
const imagedata = [
  {uri: 'https://source.unsplash.com/1024x768/?tree'},
  {uri: 'https://source.unsplash.com/1024x768/?girl'},
  {uri: 'https://source.unsplash.com/1024x768/?boy'},
  {uri: 'https://source.unsplash.com/1024x768/?water'},
  {uri: 'https://source.unsplash.com/1024x768/?moon'},
  {uri: 'https://source.unsplash.com/1024x768/?tree'},
  {uri: 'https://source.unsplash.com/1024x768/?woman'},
  {uri: 'https://source.unsplash.com/1024x768/?man'},
];

type props = {
  storeId: number;
};

export const MapStoreReviewPhoto = ({storeId}: props) => {
  const [photoModal, setPhotoModal] = useState(false);
  const [reviewPhoto, setReviewPhoto] = useState<{uri: string}>({uri: 'string'});

  const reviewImages = useInfiniteQuery<IStoreReviewImages>(
    [queryKey.STOREREVIEWIMAGES, storeId],
    () => getStoreReviewImages(storeId),
    {
      onSuccess(data) {
        console.log('리뷰 사진 받기 성공: ', data.pages);
      },
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.last) {
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

  const renderedImageList = (data: any) => {
    return (
      <>
        {data[0].content.map((item, index: number) => {
          return (
            <TouchableOpacity onPress={() => openPhotoModal(item.imageUrl)} key={index}>
              <View style={{borderColor: '#FFFFFF', borderWidth: 1}}>
                <FastImage
                  source={{uri: item.imageUrl}}
                  style={{height: IMAGESIZE - 2, width: IMAGESIZE - 2}}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  return (
    <View style={[styles.reviewPhotoWrap]}>
      {renderedImageList(reviewImages.data?.pages)}
      <PhotoModal
        imageUri={reviewPhoto}
        visible={photoModal}
        closePhotoModal={() => setPhotoModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  reviewPhotoWrap: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
