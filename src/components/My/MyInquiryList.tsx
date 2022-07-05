import React, {FC, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import {MyInquiryDetails} from './MyInquiryListDetails';
import {MyInquiryMakeButton} from './MyInquiryMakeButton';

const dummyMission = [
  {
    title: '제목은 미션이 더 많았으면 좋겠어요',
    body: '본문 미션 더 주세영',
    date: '2022-12-03T16:01:34.864Z',
    status: '답변 대기중',
    inquiryId: 1,
  },
  {
    title: '제목22222222222222222222222222222222',
    body: '본문 미션 더 주세영',
    date: '2022-12-03T16:01:34.864Z',
    status: '답변 대기중',
    inquiryId: 2,
  },
  {
    title: '제목33',
    body: '본문 미션 더 주세영',
    date: '2022-12-03T16:01:34.864Z',
    status: '답변 대기중',
    inquiryId: 3,
  },
];
export type goWriteProps = {
  setNowWrite: any;
};

export const MyInquiryList: FC<goWriteProps> = ({setNowWrite}) => {
  const goWrite = () => {
    setNowWrite(true);
  };
  return (
    <View style={[styles.totalWrap]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 60}}
        scrollEventThrottle={10}
        data={dummyMission}
        renderItem={({item}) => (
          <>
            <MyInquiryDetails
              title={item.title}
              body={item.body}
              date={item.date}
              status={item.status}
              inquiryId={item.inquiryId}
            />
          </>
        )}
        ItemSeparatorComponent={() => <View style={{backgroundColor: '#E8E8E8', height: 1}} />}
      />
      <MyInquiryMakeButton goWrite={goWrite} />
    </View>
  );
};

const styles = StyleSheet.create({
  totalWrap: {
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
  },
});
