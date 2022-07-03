import React, {useState, useEffect} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {DesignSystem} from '../../assets/DesignSystem';

export type MyReviewEachProps = {
  name: string;
  date: string;
  rate: number;
  content: string;
  imageUrl: string;
  replyDate: string;
  replyReply: string;
};

//prettier-ignore
export const MyReviewEach: FC<MyReviewEachProps> = ({name, date, rate, content, imageUrl, replyDate, replyReply}) => {
  const navigation = useNavigation();

  return (
    <View style={{backgroundColor: 'white'}}>
        <View style={[styles.totalWrap]}>
            <View style={[styles.customerWrap]}>
                <View style={[styles.title]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[DesignSystem.title3SB, DesignSystem.grey17, {marginRight: 12}]}>{name}</Text>
                        <Text style={{fontFamily: 'Pretendard-Light', fontSize: 14, color: '#C4C4C4'}}>{date.slice(0,4)}.{date.slice(5,7)}.{date.slice(8,10)}</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={[DesignSystem.body1Lt, DesignSystem.grey8]}>삭제</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.stars]}>
                    <Text>{rate}⭐⭐⭐⭐⭐⭐⭐⭐</Text>
                </View>
                <View style={[styles.reviewContents]}>
                    <Text style={{fontFamily: 'Pretendard-Light', fontSize: 16, color: 'black'}}>{content}</Text>
                </View>
                <View style={[styles.reviewImg]}>
                  <Text>🚨🚨🚨🚨🚨🚨🚨🚨🚨리뷰사진🚨🚨🚨🚨🚨</Text>
                </View>
            </View>
            <View style={[styles.ownerWrap]}>
                <View style={[styles.ownerTitle, {alignItems: 'center'}]}>
                    <Text style={{fontFamily: 'Pretendard-Light', fontSize: 14, color: '#7D7D7D', marginRight: 6}}>사장님 답글</Text>
                    <Text style={[DesignSystem.grey7, {fontFamily: 'Pretendard-Light', fontSize: 14}]}>{replyDate.slice(0,4)}.{replyDate.slice(5,7)}.{replyDate.slice(8,10)}</Text>
                </View>
                <View style={[styles.ownerContents]}>
                  <Text style={[DesignSystem.body2Lt, {color: 'black'}, styles.ownerContentsText]}>{replyReply}</Text>
                </View>
            </View>
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
