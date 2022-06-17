import React from 'react';
import type {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type MapStoreReviewProps = {
  images: {uri: string}[] | [];
  name: string;
  date: string;
  rate: number;
  review: string;
};

export const MapStoreReview: FC<MapStoreReviewProps> = ({images, name, date, rate, review}) => {
  const renderedImage = (imagedata: {uri: string}[]) => {
    return (
      <View style={[styles.reviewRow3]}>
        {imagedata.map((item) => {
          return (
            <View style={[styles.reviewImageWrap]}>
              <Image source={{uri: item.uri}} style={{width: 80, height: 80}} />
            </View>
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
});
