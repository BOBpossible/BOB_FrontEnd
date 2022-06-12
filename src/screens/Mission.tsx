import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MissionCard} from '../components';
import {MissionProcess} from '../components/MissionProcess';
import {MissionProgressSwitch} from '../components/MissionProgressSwitch';
import {MissionUser} from '../components/MissionUser';

const Mission = () => {
  function missionRequest() {console.log('missionRequest');}
  function missionOnRequest() {console.log('missionOnRequest');}
  function missionSuccess() {console.log('missionSuccess');}
  function missionReview() {console.log('missionReview');}

  const [progressnow, setProgressnow] = useState(0);

  let status = 'success';
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
                <MissionProcess />
                <MissionUser username={'춘식이'} userid={123} status={status} />
                <MissionCard
                  name={'가게이름'}
                  category={'카테고리'}
                  day={7}
                  minCost={10}
                  point={10}
                  status={status}
                  handleOnPress={missionRequest}
                />
              </>
            ) : (
              <Text>진행완료화면</Text>
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
