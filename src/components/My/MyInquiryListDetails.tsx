import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';

export type MyInquiryDetailsProps = {
  title: string;
  body: string;
  date: string;
  status: string;
  inquiryId: number;
};

//prettier-ignore
export const MyInquiryDetails: FC<MyInquiryDetailsProps> = ({title, body, date, status, inquiryId}) => {
  function handleReviewPress() {
    console.log(`${inquiryId}번 문의`);
  }
  return (
    <View style={{flex: 1}}>
        <TouchableOpacity onPress={handleReviewPress} style={[styles.listDetailsWrap]}>
            <View style={[styles.listLeftWrap]}>
                <Text style={[styles.titleText, DesignSystem.title4Md]}>{title}</Text>
                <Text style={[DesignSystem.body2Lt, {color: '#949494'}]}>{date.slice(0,4)}-{date.slice(5,7)}-{date.slice(8,10)}</Text>
            </View>
            <View>
                <Text style={[DesignSystem.body1Lt, {color: '#777777'}]}>{status}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title4Md: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
  },
  listDetailsWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 14,
  },
  listLeftWrap: {
    width: 250,
  },
  titleText: {
    color: '#000000',
    marginBottom: 8,
  },
});
