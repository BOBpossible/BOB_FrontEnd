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
    <>
      <SafeAreaView style={[styles.flex]}>
        <View style={[styles.headerWrap]}>
          <View style={[styles.header]}>
            <Text style={[styles.headerText]}>미션</Text>
          </View>
          <View style={{flex: 1}}>
            {progressnow === 0 ? (
              <>
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
              </>
            ) : (
              <MissionSuccessList />
            )}
          </View>
        </View>
      </SafeAreaView>
      <MissionProgressSwitch progressnow={progressnow} setProgressnow={setProgressnow} />
    </>
  );
};

const styles = StyleSheet.create({
  flex: {},
  header: {
    height: 41,
    backgroundColor: '#FFFFFF',
  },
  headerWrap: {
    position: 'absolute',
    width: '100%',
  },
  headerText: {
    fontSize: 17,
    color: 'black',
    marginLeft: 16,
    marginRight: 16,
  },
});

export default Mission;
