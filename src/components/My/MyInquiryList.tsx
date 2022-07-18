import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, RefreshControl} from 'react-native';
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

  return (
    <View style={[styles.totalWrap]}>
      {DataQuestions.data?.length !== 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => DataQuestions.refetch()}
              refreshing={DataQuestions.isLoading}
            />
          }
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{paddingTop: 60}}
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
