import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useQuery} from 'react-query';
import {getQuestions} from '../../api/my';
import {queryKey} from '../../api/queryKey';
import {MyInquiryDetails} from './MyInquiryListDetails';
import {MyInquiryMakeButton} from './MyInquiryMakeButton';

export type goWriteProps = {
  setNowWrite: any;
};

export const MyInquiryList: FC<goWriteProps> = ({setNowWrite}) => {
  const goWrite = () => {
    setNowWrite(true);
  };
  const DataQuestions = useQuery(queryKey.QUESTIONS, getQuestions);
  // console.log(DataQuestions.data);

  return (
    <View style={[styles.totalWrap]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 60}}
        scrollEventThrottle={10}
        data={DataQuestions.data}
        renderItem={({item}) => (
          <>
            <MyInquiryDetails
              title={item.title}
              body={item.body}
              date={item.date}
              status={item.questionStatus}
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
