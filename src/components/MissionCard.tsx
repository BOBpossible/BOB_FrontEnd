import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';

export type MissionCardProps = {
  name: string;
  category: string;
  day?: number;
  minCost: number;
  point: number;
  status?: string; //"start","request","onrequest","success", "review"
  // handleOnPress?: () => void;
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
export const MissionCard: FC<MissionCardProps> = ({name, category, minCost, point, status}) => {
  const MissionCardOneButton: FC<MissionCardContentProps> = ({handleOnPress, text }) =>{
    return (
      <>
        <TouchableOpacity onPress={handleOnPress} style={[styles.missionOneButton]}>
            <View>
            <Text style={{color: 'white', fontSize: 16}}>{text}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  const MissionCardTwoButton: FC<MissionCardContentProps> = ({handleOnPress, text, cancelBgColor, cancelTextColor, bgColor }) =>{
    function cancleCard(){
      console.log('canceled');
    }
    return (
      <View style={[styles.missionTwoButton]}>
        <TouchableOpacity style={[styles.missionButtonLeft, {backgroundColor: `${cancelBgColor}`}]} onPress={cancleCard}>
          <View >
            <Text style={{fontSize: 16, color: `${cancelTextColor}`}}>취소</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.missionButtonRight, {backgroundColor: `${bgColor}`}]} onPress={handleOnPress}>
          <View>
            <Text style={{color:'white', fontSize: 16}}>{`${text}`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  function handleRequestPress() {
    //성공요청 버튼 누를 시
    console.log('성공요청');
    // 사장님께 전송 -> 사장님이 확인->
  }
  function handleSuccessPress() {
    //성공 버튼 누를 시
    console.log('성공');
  }
  function handleReviewPress() {
    //리뷰 버튼 누를 시
    console.log('리뷰 : 냠 냠 ');
  }

  return (
    <View style={[styles.missionCardWrap]}>
      <View style={[styles.missionCard]}>
        <View style={[styles.missionMain]}>
          <View style={[styles.nameBox]}>
            <Text style={[styles.nameText]}>{name}</Text>
            <Text style={[styles.categoryText]}>{category}</Text>
          </View>
          <View style={[styles.seperateLine]} />
          <View>
            <Text>
              <Text style={[styles.costText]}>{minCost}원 이상</Text>
              <Text>의 식사시 </Text>
              <Text style={[styles.pointText]}>{point}P 적립</Text>
            </Text>
          </View>
        </View>
        {status === 'start' ?
        null
        :
        status === 'request' ?
        <MissionCardTwoButton handleOnPress={handleRequestPress} text='성공 요청' bgColor='black' cancelBgColor='#E8E8E8' cancelTextColor='#111111'/>
        :
        status === 'onrequest' ?
        <MissionCardTwoButton text='성공 요청중..' bgColor='#2A2A2A' cancelBgColor='#E8E8E8' cancelTextColor='#111111'/>
        :
        status === 'success' ?
        <MissionCardTwoButton handleOnPress={handleSuccessPress} text='성공' bgColor='#6C69FF' cancelBgColor='#E8E8E8' cancelTextColor='#949494'/>
        :
        //  status ==='review'
        <MissionCardOneButton handleOnPress={handleReviewPress} text='리뷰 남기기' />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  missionCardWrap: {marginLeft: 16, marginRight: 16},
  missionCard: {
    height: 198,
    backgroundColor: Colors.white,
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
    borderWidth: 0.5,
    width: 303,
    borderColor: '#DFDFDF',
    marginBottom: 16,
  },
  nameText: {
    color: '#111111',
    fontSize: 16,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 16,
  },
  costText: {
    color: '#111111',
    fontSize: 16,
  },
  pointText: {
    color: '#6C69FF',
    fontSize: 16,
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
});
