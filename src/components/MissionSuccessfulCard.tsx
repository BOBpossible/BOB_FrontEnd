import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';

export type MissionSuccessfulCardProps = {
  name: string;
  category: string;
  day?: number;
  minCost: number;
  point: number;
  // handleOnPress?: () => void;
  completeMonth: number;
  completeDate: number;
  completeDay: string;
  completeStatus: string;
};
export type MissionSuccessfulCardContentProps = {
  handleOnPress?: () => void;
  text: string;
  textColor?: string;
  cancelBgColor?: string;
  cancelTextColor?: string;
  bgColor?: string;
};

//prettier-ignore
export const MissionSuccessfulCard: FC<MissionSuccessfulCardProps> = ({name, category, minCost, point, completeMonth, completeDate, completeDay,  completeStatus}) => {
  function handleReviewPress() {
    console.log('리뷰 : 냠 냠 ');
  }

  return (
    <View style={[styles.missionCardWrap]}>
      <View style={[styles.missionCard]}>
        <View style={[styles.missionMain]}>
          <Text style={[styles.dateText]}>{completeMonth}/{completeDate} ({completeDay}) • {completeStatus}</Text>
          <View style={[styles.nameBox]}>
            <Text style={[styles.nameText]}>{name}</Text>
            <Text style={[styles.categoryText]}>{category}</Text>
          </View>
          <View style={[styles.seperateLine]} />
          <View style={{marginBottom: 16, flexDirection: 'row'}}>
            <Text style={[styles.costText]}>{minCost}원 이상</Text>
            <Text>의 식사시 </Text>
            <Text style={[styles.pointText]}>{point}P 적립</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleReviewPress} style={[styles.makeReviewButton]}>
            <Text style={{color: '#949494', fontSize: 14}}>리뷰 남기기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  missionCardWrap: {marginLeft: 16, marginRight: 16},
  missionCard: {
    height: 210,
    backgroundColor: Colors.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missionMain: {
    width: 303,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#949494',
    marginBottom: 7,
    fontSize: 12,
  },
  nameBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  nameText: {
    color: '#111111',
    fontSize: 16,
  },
  categoryText: {
    fontSize: 14,
    color: '#616161',
  },
  seperateLine: {
    borderWidth: 0.5,
    width: 303,
    borderColor: '#DFDFDF',
    marginBottom: 12,
  },
  costText: {
    color: '#111111',
    fontSize: 16,
  },
  pointText: {
    color: '#6C69FF',
    fontSize: 16,
  },
  makeReviewButton: {
    width: 303,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
