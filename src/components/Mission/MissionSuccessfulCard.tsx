import React, {useState} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';
import {DesignSystem} from '../../assets/DesignSystem';
import ReviewModal from '../../modal/ReviewModal';
import StoreModal from '../../modal/StoreModal';

export type MissionSuccessfulCardProps = {
  mission: string;
  missionId?: number;
  point: number;
  storeCategory: string;
  storeId: number;
  storeName: string;
  successDate: string; //성공날짜 서버에 따라 수정필
  dayOfWeek: string;
  reviewStatus: string;
};

export const MissionSuccessfulCard: FC<MissionSuccessfulCardProps> = ({
  dayOfWeek,
  mission,
  missionId,
  point,
  storeCategory,
  storeId,
  storeName,
  successDate,
  reviewStatus,
}) => {
  const [reviewModal, setReviewModal] = useState(false);
  function handleReviewPress() {
    setReviewModal(true);
    console.log(storeId, '번 리뷰 작성');
  }

  const [storeModal, setStoreModal] = useState(false);
  return (
    <View style={[styles.missionCardWrap]}>
      <TouchableOpacity
        style={[styles.missionCard]}
        disabled={reviewStatus === 'NEW' ? true : false}
        onPress={() => setStoreModal(true)}
      >
        <View style={[styles.missionMain]}>
          <View style={[styles.nameBox]}>
            <Text style={[DesignSystem.caption1Lt, DesignSystem.grey8]}>
              {successDate.slice(5, 7)}/{successDate.slice(8, 10)} ({dayOfWeek})
            </Text>
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
        {reviewStatus === 'NEW' ? (
          <TouchableOpacity onPress={handleReviewPress} style={[styles.makeReviewButton]}>
            <Text style={[DesignSystem.h3SB, DesignSystem.purple5]}>리뷰 작성</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </TouchableOpacity>
      <ReviewModal
        visible={reviewModal}
        closeReviewModal={() => setReviewModal(false)}
        storeId={storeId}
        missionId={missionId}
      />
      <StoreModal
        visible={storeModal}
        closeStoreModal={() => setStoreModal(false)}
        storeId={storeId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  missionCardWrap: {marginLeft: 16, marginRight: 16, flex: 1},
  missionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  missionMain: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(calHeight(10)),
  },
  nameBox: {
    alignItems: 'center',
  },
  seperateLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#DFDFDF',
    marginTop: hp(calHeight(10)),
    marginBottom: hp(calHeight(10)),
  },
  makeReviewButton: {
    width: wp(calWidth(303)),
    height: hp(calHeight(42)),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6C69FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneReviewButton: {
    width: wp(calWidth(303)),
    height: hp(calHeight(42)),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
