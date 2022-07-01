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
  titleWrap: {
    flexDirection: 'row',
  },
  nameInput: {
    width: '100%',
    height: 44,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#111111',
  },
  focusBorder: {borderColor: '#6C69FF', borderWidth: 1},
  unfocusBorder: {borderColor: '#DFDFDF', borderWidth: 1},
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  titleXView: {
    width: 18,
    height: 18,
  },
  titleX: {
    width: 18,
    height: 18,
  },
  bodyWrap: {
    marginTop: 16,
  },
  bodyInput: {
    width: '100%',
    height: 220,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#111111',
    alignItems: 'center',
    textAlignVertical: 'top',
  },
  //
  buttonWrap: {justifyContent: 'center', alignItems: 'center', margin: 20},
  buttonStyle: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  activeButton: {backgroundColor: '#6C69FF'},
  inactiveButton: {backgroundColor: '#E8E8E8'},
  activeButtonText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    color: '#FFFFFF',
  },
  inactiveButtonText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    color: '#C8C8C8',
  },
});
