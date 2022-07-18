import React, {useState} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {calWidth} from '../../assets/CalculateLength';
import {useQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getQuestionDetail} from '../../api/my';

export type MyInquiryDetailsProps = {
  title: string;
  date: string;
  status: string;
  questionId: number;
};

export const MyInquiryDetails: FC<MyInquiryDetailsProps> = ({title, date, status, questionId}) => {
  const [openQuestion, setOpenQuestion] = useState(false);
  function handleReviewPress() {
    console.log(`${questionId}번 문의`);
    setOpenQuestion(!openQuestion);
  }
  const {data} = useQuery([queryKey.QUESTIONDETAIL, questionId], () =>
    getQuestionDetail(questionId),
  );

  return (
    <View style={styles.inquiryCardBottomLine}>
      <TouchableOpacity onPress={handleReviewPress} style={[styles.listDetailsWrap]}>
        <View style={[styles.listLeftWrap]}>
          <Text style={[styles.titleText, DesignSystem.title4Md]}>
            {title.length < 24 ? title : title.slice(0, 24)}
            {title.length < 24 ? null : '...'}
          </Text>
          <Text style={[DesignSystem.body2Lt, {color: '#949494'}]}>
            {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)}
          </Text>
        </View>
        <View>
          <Text
            style={[DesignSystem.body1Lt, {color: status === 'WAITING' ? '#777777' : '#6C69FF'}]}
          >
            {status === 'WAITING' ? '답변 대기중' : '답변 완료'}
          </Text>
        </View>
      </TouchableOpacity>
      {openQuestion && (
        <View>
          <View style={styles.myInquiryContent}>
            <Text style={[DesignSystem.body1Long, {color: 'black'}]}>{data?.content}</Text>
          </View>
          {status !== 'WAITING' && (
            <View style={styles.inquiryAnswer}>
              <Text style={[DesignSystem.title4Md, DesignSystem.purple5, {}]}>밥플레이스</Text>
              <Text style={[DesignSystem.body1Long, {color: 'black'}]}>
                {data?.answers[0].answer}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inquiryCardBottomLine: {
    flex: 1,
    paddingBottom: 8,
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  listDetailsWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 14,
  },
  listLeftWrap: {
    width: wp(calWidth(250)),
  },
  titleText: {
    color: '#000000',
    marginBottom: 8,
  },
  myInquiryContent: {
    padding: 16,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 8,
  },
  inquiryAnswer: {
    padding: 16,
    backgroundColor: '#F8F8F8',
    marginBottom: 14,
    borderRadius: 10,
  },
});
