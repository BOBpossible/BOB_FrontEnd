import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../assets/CalculateLength';
import {DesignSystem} from '../assets/DesignSystem';
import ReviewModal from '../modal/ReviewModal';

export type MissionSuccessfulCardContentProps = {
  handleOnPress?: () => void;
  text: string;
  textColor?: string;
  cancelBgColor?: string;
  cancelTextColor?: string;
  bgColor?: string;
};
export type MissionSuccessfulCardProps = {
  mission: string;
  missionId?: number;
  point: number;
  storeCategory: string;
  storeName: string;
  missionStatus?: string; //"NEW","PROGRESS","OWNER_CHECK"
  successDate: string; //성공날짜 서버에 따라 수정필
  dayOfWeek: string;
};

//prettier-ignore
export const MissionSuccessfulCard: FC<MissionSuccessfulCardProps> = ({
  mission, missionId, point, storeCategory, storeName, missionStatus, successDate, dayOfWeek
}) => {
  const [reviewModal, setReviewModal] = useState(false);
  function handleReviewPress() {
    setReviewModal(true);
  }
  const storeId = 1; //서버 후 수정


  return (
    <View style={[styles.missionCardWrap]}>
      <View style={[styles.missionCard]}>
        <View style={[styles.missionMain]}>
          <Text style={[DesignSystem.caption1Lt, styles.dateText]}>{successDate.slice(5,7)}/{successDate.slice(8,10)} ({dayOfWeek})</Text>
          <View style={[styles.nameBox]}>
            <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>{storeName}</Text>
            <Text style={[DesignSystem.body2Lt, DesignSystem.grey10]}>{storeCategory}</Text>
          </View>
          <View style={[styles.seperateLine]} />
          <View>
            <Text>
              <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>{mission}</Text>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}> 결제시 </Text>
              <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>{point}P 적립</Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleReviewPress} style={[styles.makeReviewButton]}>
            <Text style={[DesignSystem.h3SB, {color: '#6C69FF', fontSize: 14}]}>리뷰 남기기</Text>
        </TouchableOpacity>
      </View>
      <ReviewModal
        visible={reviewModal}
        closeReviewModal={() => setReviewModal(false)}
        storeId={storeId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  missionCardWrap: {marginLeft: 16, marginRight: 16},
  missionCard: {
    height: 198,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center', //
  },
  missionMain: {
    flex: 1,
    width: 303,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    color: '#949494',
    marginBottom: 7,
  },
  seperateLine: {
    height: 1,
    width: 303,
    backgroundColor: '#DFDFDF',
    marginBottom: 12,
  },
  makeReviewButton: {
    width: wp(calWidth(303)),
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6C69FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
