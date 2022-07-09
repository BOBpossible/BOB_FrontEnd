import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import moment from 'moment';
import {DesignSystem} from '../../assets/DesignSystem';

export type MyPointListProps = {
  date: string;
  title: string;
  subTitle?: string;
  point: number;
};

//prettier-ignore
export const MyPointList: FC<MyPointListProps> = ({date, title, subTitle, point}) => {
  const formatDate = new moment(date.slice(0,10), 'YYYY-MM-DD').format('YYMMDD');
  const month = formatDate.slice(2,3) === '0' ? formatDate.slice(3,4) : formatDate.slice(2,4);
  const day = formatDate.slice(4,5) === '0' ? formatDate.slice(5,6) : formatDate.slice(4,6);

  return (
    <View style={[styles.listWrap]}>
        <View style={[styles.listDayWrap]}>
            <Text style={[styles.dateText, DesignSystem.title3SB]}>{month}.{day}</Text>
        </View>
        <View style={[styles.listDetailsWrap]}>
            <View>
                <Text style={[styles.storeNameText, DesignSystem.title3SB]}>{title}</Text>
                {subTitle !== undefined && (<Text style={[styles.missionText, {fontFamily: 'Pretendard-Light'}]}>{subTitle}</Text>)}
            </View>
            <View>
                <Text style={[DesignSystem.title3SB, {color: point > 0 ? '#6C69FF' : '#B7B7B7'}]}>{point.toString().replace(/\B(?=(\d{3})(?!\d))/g, ',')}P</Text>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listWrap: {
    flexDirection: 'row',
  },
  listDayWrap: {
    marginRight: 16,
    width: 44,
  },
  dateText: {
    color: '#2A2A2A',
  },
  listDetailsWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storeNameText: {
    color: '#3F3F3F',
  },
  missionText: {
    color: '#949494',
    fontFamily: 'Pretendard-Light',
  },
});
