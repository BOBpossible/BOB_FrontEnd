import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MissionCard} from '../components';
import {ProgressSwitch} from '../components/ProgressSwitch';

const Mission = () => {
  function missionRequest() {console.log('missionRequest');}
  function missionOnRequest() {console.log('missionOnRequest');}
  function missionSuccess() {console.log('missionSuccess');}
  function missionReview() {console.log('missionReview');}

  const [progressnow, setProgressnow] = useState(0);

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
                <MissionCard
                  name={'가게이름'}
                  category={'카테고리'}
                  day={7}
                  minCost={10}
                  point={10}
                  status="request"
                  handleOnPress={missionRequest}
                />
              </>
            ) : (
              <Text>진행완료화면</Text>
            )}
          </View>
        </View>
      </SafeAreaView>
      <ProgressSwitch progressnow={progressnow} setProgressnow={setProgressnow} />
    </>
  );
};

const styles = StyleSheet.create({
  flex: {},
  header: {
    marginLeft: 16,
    marginRight: 16,
    height: 41,
  },
  headerWrap: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'pink',
  },
  headerText: {fontSize: 17, color: 'black'},
});

export default Mission;
