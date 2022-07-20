import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';
import {ReviewReportModal} from '../../modal/ReviewReportModal';

type MapStoreReviewProps = {
  images: {imageUrl: string}[];
  name: string;
  date: string;
  rate: number;
  content: string;
  reviewId: number;
  reply: {date: string; reply: string; reviewReplyId: number}[];
  openPhotoModal: (imageSource: string) => void;
};

export const MapStoreReview: FC<MapStoreReviewProps> = ({
  images,
  name,
  date,
  rate,
  content,
  reply,
  reviewId,
  openPhotoModal,
}) => {
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
  const [reportModal, setReportModal] = useState(false);
  const handleRepotModal = () => {
    setReportModal(true);
  };
  return (
    <View style={{backgroundColor: 'white', paddingHorizontal: 16}}>
      <View style={[styles.totalWrap]}>
        <View style={[styles.customerWrap]}>
          <View style={[styles.title]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[DesignSystem.title4Md, {color: '#000000', marginRight: 12}]}>
                {name}
              </Text>
              <Text style={[DesignSystem.body1Lt, {color: '#C8C8C8'}]}>
                {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)}
              </Text>
            </View>
            <TouchableOpacity onPress={handleRepotModal}>
              <Text style={[DesignSystem.body1Lt, {color: '#C4C4C4'}]}>신고하기</Text>
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
            <Text style={[DesignSystem.body1Long, {color: 'black'}]}>{content}</Text>
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
      <ReviewReportModal
        visible={reportModal}
        closeReportModal={() => setReportModal(false)}
        reviewId={reviewId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderColor: '#EDEDED',
    borderWidth: 1,
  },
  replyHeader: {
    color: '#7D7D7D',
    marginRight: 8,
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
    lineHeight: 14,
  },
  replyDate: {color: '#B7B7B7', fontFamily: 'Pretendard-Light', fontSize: 14, lineHeight: 14},
  replyComment: {
    borderColor: '#DFDFDF',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  totalWrap: {
    marginTop: 12,
    marginBottom: 12,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EDEDED',
  },
  customerWrap: {
    flexDirection: 'column',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
});
