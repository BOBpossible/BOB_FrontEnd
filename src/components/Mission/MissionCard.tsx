import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {customAxios} from '../../api/customAxios';

export type MissionCardProps = {
  mission: string;
  missionId?: number;
  point: number;
  storeCategory: string;
  storeName: string;
  missionStatus?: string; //"NEW","PROGRESS","OWNER_CHECK"
  onPressRequestBtn: () => void;
};
export type MissionCardContentProps = {
  handleOnPress?: () => void;
  text: string;
  textColor?: string;
  cancelBgColor?: string;
  cancelTextColor?: string;
  bgColor?: string;
};

//prettier-ignore
export const MissionCard: FC<MissionCardProps> = ({mission, missionId, point, storeCategory, storeName, missionStatus, onPressRequestBtn}) => {
  const MissionCardTwoButton: FC<MissionCardContentProps> = ({handleOnPress, text, cancelBgColor, cancelTextColor, bgColor }) =>{
    function cancleCard(){
      console.log('canceled');
    }
    return (
      <>
        <View style={[styles.missionTwoButton]}>
          <TouchableOpacity style={[styles.missionButtonLeft, {backgroundColor: `${cancelBgColor}`}]} onPress={cancleCard}>
            <View >
              <Text style={[DesignSystem.body1Lt, {color: `${cancelTextColor}`}]}>취소</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity disabled={text === '성공 요청' ? false : true} style={[styles.missionButtonRight, {backgroundColor: `${bgColor}`}]} onPress={handleOnPress}>
            <View>
              {text === '성공 요청' ? (
                <Text style={[DesignSystem.title3SB, {color:'white'}]}>{`${text}`}</Text>
              ) : (
                <Text style={[DesignSystem.title4Md, {color:'white'}]}>{`${text}`}</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const handleRequestPress = () => {
    //성공요청 버튼 누를 시
    console.log(missionId,'번 가게 성공요청');
    onPressRequestBtn();
    // 사장님께 전;송 -> 사장님이 확인->
    const patchTest = customAxios().patch(`/api/v1/missions/users/success/${missionId}`, null);
    console.log(patchTest);//서버더미데이터에 missionId가없다!
  };
  function handleSuccessPress() {
    //성공 버튼 누를 시
    console.log(missionId,'번 가게 성공');
  }

  return (
    <View style={[styles.missionCardWrap]}>
      <View style={[styles.missionCard]}>
        <View style={[styles.missionMain]}>
          <View style={[styles.nameBox]}>
            <Text style={[DesignSystem.title4Md, styles.nameText]}>{storeName}</Text>
            <Text style={[DesignSystem.body2Lt, styles.categoryText]}>{storeCategory}</Text>
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
        {
        missionStatus === 'NEW' ?
        <MissionCardTwoButton handleOnPress={handleRequestPress} text='성공 요청' bgColor='#6C69FF' cancelBgColor='#E8E8E8' cancelTextColor='#111111'/>
        :
        missionStatus === 'PROGRESS' ?
        <MissionCardTwoButton text='성공 요청중..' bgColor='#C8C8C8' cancelBgColor='#EFEFEF' cancelTextColor='#111111'/>
        :
        // missionStatus === 'OWNER_CHECK'
        <MissionCardTwoButton handleOnPress={handleSuccessPress} text='성공 승인' bgColor='#B7B7B7' cancelBgColor='#DFDFDF' cancelTextColor='#949494'/>
        }
      </View>
      {missionStatus === 'NEW' && (
          <View style={{width: '100%', flexDirection: 'row-reverse'}}>
            <View style={[DesignSystem.centerArrange, {top: -7, width: '50%'}]}>
              <Icon name="triangle" size={12} style={[styles.headerIconStyle]} />
              <View style={[styles.NEWBallon, DesignSystem.centerArrange]}>
                <View style={[styles.flexRow]}>
                  <Text style={[styles.ballonTextTwo]}>포장/식사 </Text>
                  <Text style={[styles.ballonTextOne]}>미션 완료 후</Text>
                  <Text style={[styles.ballonTextTwo]}> 클릭!</Text>
                </View>
              </View>
            </View>
          </View>
        )}
{/* // */}
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
  nameBox: {flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},
  missionMain: {
    flex: 1,
    width: 303,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperateLine: {
    height: 1,
    width: 303,
    backgroundColor: '#DFDFDF',
    marginBottom: 16,
  },
  nameText: {
    color: '#111111',
    marginBottom: 4,
  },
  categoryText: {
    color: '#616161',
    marginBottom: 16,
  },
  costText: {
    fontFamily: 'Pretendard-medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#111111',
  },
  pointText: {
    fontFamily: 'Pretendard-medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#6C69FF',
  },
  missionOneButton: {
    height: 48,
    width: '100%',
    backgroundColor: 'black',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  missionTwoButton: {
    flexDirection: 'row',
    height: 48,
  },
  missionButtonLeft: {
    width: '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
    borderBottomLeftRadius: 15,
  },
  missionButtonRight: {
    width: '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderBottomRightRadius: 15,
  },
  missionButtonView: {
    borderWidth: 2,
  },
  NEWBallon: {
    //말풍선
    flexDirection: 'column',
    backgroundColor: '#383838',
    top: -3,
    height: 38,
    borderRadius: 6,
    paddingRight: 13,
    paddingLeft: 13,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerIconStyle: {
    color: '#2A2A2A',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ballonTextOne: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    fontWeight: '800',
    color: '#AAAAF9',
  },
  ballonTextTwo: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '800',
  },
});
