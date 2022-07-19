import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import moment from 'moment';
import {DesignSystem} from '../../assets/DesignSystem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';

export type MyPointListProps = {
  date: string;
  title: string;
  subTitle?: string;
  point: number;
};

export const MyPointList: FC<MyPointListProps> = ({date, title, subTitle, point}) => {
  const formatDate = moment(date.slice(0, 10), 'YYYY-MM-DD').format('YYMMDD');
  const month = formatDate.slice(2, 3) === '0' ? formatDate.slice(3, 4) : formatDate.slice(2, 4);
  const day = formatDate.slice(4, 5) === '0' ? formatDate.slice(5, 6) : formatDate.slice(4, 6);
  return (
    <View style={[styles.listWrap]}>
      <View style={[styles.listDayWrap]}>
        <Text style={[DesignSystem.grey14, DesignSystem.title3SB]}>
          {month}.{day}
        </Text>
      </View>
      <View style={[styles.listDetailsWrap]}>
        <View>
          <Text style={[DesignSystem.grey12, DesignSystem.title3SB]}>{title}</Text>
          {subTitle !== undefined && (
            <Text style={[DesignSystem.grey8, DesignSystem.body1Long]}>{subTitle}</Text>
          )}
        </View>
        <View>
          <Text
            style={[DesignSystem.title3SB, point > 0 ? DesignSystem.purple5 : DesignSystem.grey7]}
          >
            {point > 0 ? '+' : ''}
            {point.toString().replace(/\B(?=(\d{3})(?!\d))/g, ',')}P
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listWrap: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  listDayWrap: {
    marginRight: 16,
    width: wp(calWidth(44)),
  },
  listDetailsWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
