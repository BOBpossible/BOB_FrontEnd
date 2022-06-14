import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MissionCard} from '../components';
import {MissionProcess} from '../components/MissionProcess';
import {MissionProgressSwitch} from '../components/MissionProgressSwitch';
import {MissionSuccessList} from '../components/MissionSuccessList';
import {MissionUser} from '../components/MissionUser';
//"start"
//"request","onrequest" :'진행중' processCircle  // "success" : '도전 성공' processCircle
//"review"
const Mission = () => {
  const [status, setStatus] = useState<string>('request'); //버튼문구 //"start","request","onrequest","success", "review"
  const [progressnow, setProgressnow] = useState(0); //아래 스위치.  0:진행중  1:진행완료

  return (
    <SafeAreaView style={[styles.flex]}>
      <View style={[styles.headerWrap]}>
        <View style={[styles.header]}>
          <Text style={[styles.headerText]}>미션</Text>
        </View>
      </View>
      <View style={{backgroundColor: '#F6F6FA', height: '100%'}}>
        {progressnow === 0 ? (
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
  header: {
    height: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  headerWrap: {
    width: '100%',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 17,
    color: 'black',
    marginLeft: 16,
    marginRight: 16,
    fontWeight: '600',
  },
});

export default Mission;
