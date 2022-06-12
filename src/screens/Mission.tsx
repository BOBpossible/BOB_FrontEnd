import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MissionCard} from '../components';
import {moveLeft} from '../components/ProgressSwitch';
import {moveRight} from '../components/ProgressSwitch';

const Mission = () => {
  function missionRequest() {console.log('missionRequest');}
  function missionOnRequest() {console.log('missionOnRequest');}
  function missionSuccess() {console.log('missionSuccess');}
  function missionReview() {console.log('missionReview');}

  const progressValue = useState(new Animated.Value(-10))[0];
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
      <View style={[styles.progressRow]}>
        <View style={[styles.progressToggle]}>
          <Animated.View
            style={
              progressnow === 0
                ? [
                    styles.progressSwitch,
                    {width: 68, borderRadius: 21, transform: [{translateX: progressValue}]},
                  ]
                : [
                    styles.progressSwitch,
                    {width: 79, borderRadius: 21, transform: [{translateX: progressValue}]},
                  ]
            }
          />
          <TouchableOpacity
            onPress={() => {
              setProgressnow(0);
              moveRight(progressValue);
            }}
          >
            <Text
              style={
                progressnow === 0
                  ? [{fontSize: 14, color: 'white'}]
                  : [{fontSize: 14, color: '#616161'}]
              }
            >
              진행중
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setProgressnow(1);
              moveLeft(progressValue);
            }}
          >
            <Text
              style={
                progressnow === 0
                  ? [{fontSize: 14, color: '#616161'}]
                  : [{fontSize: 14, color: 'white'}]
              }
            >
              진행완료
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  progressRow: {
    width: '100%',
    position: 'absolute',
    bottom: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressToggle: {
    flexDirection: 'row',
    borderRadius: 12.5,
    width: 138,
    height: 34,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  progressSwitch: {
    height: '80%',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 2,
  },
});

export default Mission;
