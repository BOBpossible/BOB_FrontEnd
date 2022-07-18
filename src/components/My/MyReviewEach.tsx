import React, {useState} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IMyReviewEachProps} from '../../data';
import FastImage from 'react-native-fast-image';
import {QueryClient, useMutation, useQueryClient} from 'react-query';
import {postDeleteReview} from '../../api';
import {queryKey} from '../../api/queryKey';
import ReviewDeleteModal from '../../modal/ReviewDeleteModal';

type MyReviewEachType = {
  reviewId: string;
  images: {imageUrl: string}[];
  name: string;
  date: string;
  rate: number;
  content: string;
  reply: {date: string; reply: string; reviewReplyId: number}[];
  openPhotoModal: (imageSource: string) => void;
};

export const MyReviewEach: FC<MyReviewEachType> = ({
  reviewId,
  name,
  date,
  rate,
  content,
  images,
  reply,
  openPhotoModal,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const renderedImage = (imagedata: {imageUrl: string}[]) => {
    return (
      <View style={[styles.reviewRow3]}>
        {imagedata.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => openPhotoModal(item.imageUrl)}>
              <View style={[styles.reviewImageWrap]}>
                <FastImage source={{uri: item.imageUrl}} style={[styles.imageSize]} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white', marginBottom: 8}}>
      <View style={[styles.totalWrap]}>
        <View style={[styles.customerWrap]}>
          <View style={[styles.title]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[DesignSystem.title3SB, DesignSystem.grey17, {marginRight: 12}]}>
                {name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Pretendard-Light',
                  fontSize: 14,
                  lineHeight: 14,
                  color: '#C4C4C4',
                }}
              >
                {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setOpenDeleteModal(true);
              }}
            >
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey8]}>삭제</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.stars]}>
            {[...Array(rate)].map((e, i) => (
              <View key={i}>
                <Icon name="star" size={18} color={'#FFDE69'} />
              </View>
            ))}
          </View>
          <View style={[styles.reviewContents]}>
            <Text style={[DesignSystem.body1Lt, {color: 'black'}]}>{content}</Text>
          </View>
          {renderedImage(images)}
        </View>
        {reply.length !== 0 && (
          <View style={[styles.ownerWrap]}>
            <View style={[styles.ownerTitle, {alignItems: 'center'}]}>
              <Text style={[DesignSystem.body2Lt, {color: '#616161', marginRight: 6}]}>
                사장님 답글
              </Text>
              <Text style={[DesignSystem.body2Lt, {color: '#B7B7B7'}]}>
                {reply[0].date.slice(0, 4)}.{reply[0].date.slice(5, 7)}.{reply[0].date.slice(8, 10)}
              </Text>
            </View>
            <View style={[styles.ownerContents]}>
              <Text style={[DesignSystem.body2Long, {color: 'black'}, styles.ownerContentsText]}>
                {reply[0].reply}
              </Text>
            </View>
          </View>
        )}
      </View>
      <ReviewDeleteModal
        visible={openDeleteModal}
        closeReviewDeleteModal={() => setOpenDeleteModal(false)}
        reviewId={reviewId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  totalWrap: {
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 16,
    marginRight: 16,
  },
  customerWrap: {
    flexDirection: 'column',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
  },
  reviewContents: {
    marginTop: 10,
  },
  ownerWrap: {
    flexDirection: 'column',
  },
  ownerTitle: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  ownerContents: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFDFDF',
  },
  ownerContentsText: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  reviewRow3: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  reviewImageWrap: {marginRight: 8},
  imageSize: {
    height: 80,
    width: 80,
  },
});
