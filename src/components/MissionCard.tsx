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
  status?: string; //"start","request","onrequest","success"
};
//prettier-ignore
export const MissionCard: FC<MissionCardProps> = ({name, category, day, minCost, point, status}) => {
  return (
    <View style={{marginLeft: 16, marginRight: 16}}>
      <View style={[styles.missionCard]}>
        <View style={[styles.missionMain]}>
          <View style={[styles.nameBox]}>
            <Text style={[styles.nameText]}>{name}</Text>
            <Text style={[styles.categoryText]}>{category}</Text>
          </View>
          <View style={[styles.seperateLine]} />
          <View style={[styles.contentBox]}>
            <Text>
              <Text style={[styles.costText]}>{minCost}원 이상</Text>
              <Text>의 식사시 </Text>
              <Text style={[styles.pointText]}>{point}P 적립</Text>
            </Text>
          </View>
        </View>
        {status === 'start' ?
        <View style={[styles.missionOneButton]}>
          <TouchableOpacity>
            <View>
              <Text style={{color: 'white', fontSize: 16}}>미션 도전</Text>
            </View>
          </TouchableOpacity>
        </View>
        :
        <View style={[styles.missionTwoButton]}>
          <TouchableOpacity style={status==='success' ? [styles.missionButtonLeft, {backgroundColor: '#E8E8E8'}] : [styles.missionButtonLeft, {backgroundColor: '#DFDFDF'}]}>
            <View >
              <Text style={status==='success' ? {color: '#949494'} : {color: '#111111'}}>취소</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={status==='request' ? [styles.missionButtonRight, {backgroundColor: 'black'}] : status==='onrequest' ? [styles.missionButtonLeft, {backgroundColor: '#2A2A2A'}] : [styles.missionButtonLeft, {backgroundColor: '#6C69FF'}]}>
            <View>
              <Text style={{color:'white'}}>{status === 'request' ? '성공요청' : status === 'onrequest' ? '성공요청 중...' : '성공!'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        }
      </View>
       {/* <View style={status==='start' ? [styles.missionButtonView, styles.missionStartView] :
      //     status === 'request' ? [styles.missionButtonView, styles.missionRequestView] :
      //     status === 'onrequest' ? [styles.missionButtonView, styles.missionOnRequestView] : [styles.missionButtonView, styles.missionSuccessView]}> */}
    </View>
  );
};

const styles = StyleSheet.create({
  missionCard: {
    flex: 1,
    height: 198,
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    alignItems: 'center', //
  },
  dDay: {position: 'absolute', top: 20, right: 30, fontWeight: '600', color: '#615EFF'},
  nameBox: {flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},
  missionMain: {
    flex: 1,
    width: 303,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // contentBox: {
  // },
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
