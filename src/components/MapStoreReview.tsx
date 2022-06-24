import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type MapStoreReviewProps = {
  images: {uri: string; id: number}[] | [];
  name: string;
  date: string;
  rate: number;
  review: string;
  openPhotoModal: (imageSource: string) => void;
};

export const MapStoreReview: FC<MapStoreReviewProps> = ({
  images,
  name,
  date,
  rate,
  review,
  openPhotoModal,
}) => {
  const renderedImage = (imagedata: {uri: string; id: number}[]) => {
    return (
      <View style={[styles.reviewRow3]}>
        {imagedata.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => openPhotoModal(item.uri)}>
              <View style={[styles.reviewImageWrap]} key={item.id}>
                <FastImage source={{uri: item.uri}} style={[styles.imageSize]} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={[styles.reviewWrap]}>
      <View style={[styles.reviewRow1]}>
        <Text>{name}</Text>
        <Text>{date}</Text>
      </View>
      <View style={[styles.reviewRow2]}>
        <Icon name="star" size={18} color={'#6C69FF'} />
        <Text style={[styles.reviewRate]}>{rate}</Text>
      </View>
      <View style={[styles.reviewRow3]}>
        <Text style={[styles.reviewText]}>{review}</Text>
      </View>
      {renderedImage(images)}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewListWrap: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  reviewWrap: {
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24,
    paddingTop: 24,
  },
  reviewRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  reviewRow2: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  reviewRow3: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  reviewImageWrap: {marginRight: 8},
  reviewText: {
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  reviewRate: {
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
    marginLeft: 4,
  },
  imageSize: {
    height: 80,
    width: 80,
  },
});
