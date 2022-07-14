import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useQuery} from 'react-query';
import {getQuestions} from '../../api/my';
import {queryKey} from '../../api/queryKey';
import {MyInquiryDetails} from './MyInquiryListDetails';
import {MyInquiryMakeButton} from './MyInquiryMakeButton';
import {MyPageNo} from './MyPageNo';

export type goWriteProps = {
  setNowWrite: any;
};

export const MyInquiryList: FC<goWriteProps> = ({setNowWrite}) => {
  const goWrite = () => {
    setNowWrite(true);
  };
  const DataQuestions = useQuery(queryKey.QUESTIONS, getQuestions);
  console.log(DataQuestions.data);

  return (
    <View style={[styles.totalWrap]}>
      {DataQuestions.data?.length !== 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 60}}
          scrollEventThrottle={10}
          data={DataQuestions.data}
          renderItem={({item}) => (
            <>
              <MyInquiryDetails
                title={item.title}
                date={item.date}
                status={item.questionStatus}
                questionId={item.questionId}
              />
            </>
          )}
          ItemSeparatorComponent={() => <View style={{backgroundColor: '#E8E8E8', height: 1}} />}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MyPageNo isPoint={false} />
        </View>
      )}

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
