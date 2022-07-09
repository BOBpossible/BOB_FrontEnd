import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {PhotoModal} from '../../modal/PhotoModal';
import FastImage from 'react-native-fast-image';
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

export const MapStoreReviewPhoto = () => {
  const [photoModal, setPhotoModal] = useState(false);
  const [reviewPhoto, setReviewPhoto] = useState<{uri: string}>({uri: 'string'});
  const openPhotoModal = (imageSource: string) => {
    setReviewPhoto({uri: imageSource});
    setPhotoModal(true);
  };

  const renderedImageList = (data: any) => {
    return (
      <>
        {data.map((item, index: number) => {
          return (
            <TouchableOpacity onPress={() => openPhotoModal(item.uri)} key={index}>
              <View style={{borderColor: '#FFFFFF', borderWidth: 1}}>
                <FastImage
                  source={{uri: item.uri}}
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
      {renderedImageList(imagedata)}
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
