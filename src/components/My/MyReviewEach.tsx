import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type ReviewImagesType = {
  imageUrl: string;
};
export type ReviewReplyType = {
  date: string;
  reply: string;
  reviewReplyId: number;
};
export type MyReviewEachProps = {
  content: string;
  date: string;
  images: ReviewImagesType[];
  name: string;
  rate: number;
  reply: ReviewReplyType[];
  reviewId: number;
};

//prettier-ignore
export const MyReviewEach: FC<MyReviewEachProps> = ({name, date, rate, content, images, reply, reviewId}) => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={[styles.totalWrap]}>
        <View style={[styles.customerWrap]}>
            <View style={[styles.title]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[DesignSystem.title3SB, DesignSystem.grey17, {marginRight: 12}]}>{name}</Text>
                    <Text style={{fontFamily: 'Pretendard-Light', fontSize: 14, lineHeight: 14, color: '#C4C4C4'}}>{date.slice(0,4)}.{date.slice(5,7)}.{date.slice(8,10)}</Text>
                </View>
                <TouchableOpacity>
                    <Text style={[DesignSystem.body1Lt, DesignSystem.grey8]}>삭제</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.stars]}>
            {/* {Array(rate).map((e, i) => (
              <View key={i}>
                <Icon name="star" size={18} color={'#FFDE69'} />
              </View>
            ))} */}
            {/* 더미 정수로 바꿔주면 실행 */}
            </View>
            <View style={[styles.reviewContents]}>
                <Text style={[DesignSystem.body1Lt, {color: 'black'}]}>{content}</Text>
            </View>
            {images.length !== 0 && (
              <View style={[styles.reviewImg]}>
                <Text>🚨🚨🚨🚨🚨🚨🚨🚨🚨리뷰사진🚨🚨🚨🚨🚨</Text>
                {/* images.imageUrl */}
                {/* 이미지있으면 나타내는 로직 */}
              </View>
            )}
        </View>
        {reply[0] !== undefined && (
          <View style={[styles.ownerWrap]}>
              <View style={[styles.ownerTitle, {alignItems: 'center'}]}>
                  <Text style={{fontFamily: 'Pretendard-Light', fontSize: 14, lineHeight: 14, color: '#7D7D7D', marginRight: 6}}>사장님 답글</Text>
                  <Text style={[DesignSystem.grey7, {fontFamily: 'Pretendard-Light', fontSize: 14, lineHeight: 14}]}>{reply[0].date.slice(0,4)}.{reply[0].date.slice(5,7)}.{reply[0].date.slice(8,10)}</Text>
              </View>
              <View style={[styles.ownerContents]}>
                <Text style={[DesignSystem.body2Long, {color: 'black'}, styles.ownerContentsText]}>{reply[0].reply}</Text>
              </View>
          </View>
        )}
      </View>
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
    marginBottom: 16,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reviewContents: {
    marginBottom: 10,
  },
  reviewImg: {
    flexDirection: 'column',
  },
  ownerWrap: {
    flexDirection: 'column',
  },
  ownerTitle: {
    flexDirection: 'row',
    marginBottom: 8,
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
});
