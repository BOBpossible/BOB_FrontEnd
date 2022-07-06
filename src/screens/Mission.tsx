import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DesignSystem} from '../assets/DesignSystem';
import {MissionCard} from '../components';
import {MissionProcess} from '../components/MissionProcess';
import {MissionProgressSwitch} from '../components/MissionProgressSwitch';
import {MissionSuccessList} from '../components/MissionSuccessList';
import {MissionUser} from '../components/MissionUser';
import {MissionNo} from '../components/MissionNo';
import {customAxios} from '../api/customAxios';
//"start"
//"request","onrequest" :'진행중' processCircle  // "success" : '도전 성공' processCircle
//"review"
import {useRecoilValue} from 'recoil';
import {userToken} from '../state';

const Mission = () => {
  const token = useRecoilValue(userToken);
  const [status, setStatus] = useState<string>('request'); //버튼문구 //"start","request","onrequest","success", "review"
  const [progressnow, setProgressnow] = useState(0); //아래 스위치.  0:진행중  1:진행완료
  const [noMission, setNoMission] = useState(false);
  //서버연결후 미션갯수 등으로 바꿀것 !!!!!!!!!!!!!!!
  const getMissionsMeProgress = async () => {
    const res = await customAxios(token).get('missions/me/progress');
    console.log(res.data);
  };

  return (
    <SafeAreaView style={[styles.flex]}>
      <TouchableOpacity onPress={getMissionsMeProgress}>
        <Text>이잉</Text>
      </TouchableOpacity>
      <View style={[styles.headerWrap]}>
        <View style={[styles.header]}>
          <Text style={[DesignSystem.h2SB, {color: 'black'}]}>미션</Text>
        </View>
      </View>
      <View style={{backgroundColor: '#F6F6FA', height: '100%'}}>
        {progressnow === 0 ? (
          noMission ? (
            <MissionNo progressnow={progressnow} /> //미션없는화면
          ) : (
            <View>
              <MissionProcess status={status} />
              <MissionUser username={'춘식이'} userid={123} status={status} />
              <MissionCard
                name={'가게이름'}
                category={'카테고리'}
                day={7}
                minCost={10}
                point={10}
                status={status}
              />
            </View>
          )
        ) : noMission ? (
          <MissionNo progressnow={progressnow} /> //미션없는화면
        ) : (
          <MissionSuccessList />
        )}
      </View>

      <MissionProgressSwitch progressnow={progressnow} setProgressnow={setProgressnow} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  headerWrap: {
    width: '100%',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    marginLeft: 16,
  },
});

export default Mission;
