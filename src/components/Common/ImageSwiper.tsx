import React from 'react';
import type {FC} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';

type ImageSwiperProps = {
  imageList?: {imageUrl: string}[];
  height: number;
};

const dot = () => {
  const dotStyle = {
    backgroundColor: '#ffffffb2',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: -10,
  };
  return <View style={dotStyle} />;
};
const activeDot = () => {
  const activeDotStyle = {
    backgroundColor: '#6C69FF',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: -10,
  };
  return <View style={activeDotStyle} />;
};

export const ImageSwiper: FC<ImageSwiperProps> = ({height, imageList}) => {
  return (
    <View style={{height: height, width: '100%'}}>
      <Swiper dot={dot()} activeDot={activeDot()} showsButtons={false}>
        {imageList !== undefined &&
          imageList?.map((image, index) => {
            return (
              <FastImage
                key={index}
                source={{uri: image.imageUrl}}
                style={{width: '100%', height: height}}
              />
            );
          })}
      </Swiper>
    </View>
  );
};
