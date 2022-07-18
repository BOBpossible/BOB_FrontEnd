import React, {FC, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import {missionPage} from '../../state';
import {useRecoilState} from 'recoil';

function moveLeft(progressValue: Animated.Value) {
  Animated.timing(progressValue, {
    toValue: 2, //
    duration: 200, //
    useNativeDriver: false,
  }).start();
}
function moveRight(progressValue: Animated.Value) {
  Animated.timing(progressValue, {
    toValue: 68, //
    duration: 200, //
    useNativeDriver: false,
  }).start();
}

export const MissionProgressSwitch = () => {
  const progressValue = useState(new Animated.Value(2))[0]; //
  const [progressnow, setProgressnow] = useRecoilState(missionPage);
  useEffect(() => {
    if (progressnow) {
      moveLeft(progressValue);
    } else {
      moveRight(progressValue);
    }
  }, [progressnow]);

  return (
    <View style={[styles.progressRow]}>
      <View style={[styles.progressToggle]}>
        <Animated.View
          style={
            progressnow
              ? [
                  styles.progressSwitch,
                  {width: 66, borderRadius: 21, transform: [{translateX: progressValue}]},
                ]
              : [
                  styles.progressSwitch,
                  {width: 66, borderRadius: 21, transform: [{translateX: progressValue}]},
                ]
          }
        />
        <TouchableOpacity
          onPress={() => {
            setProgressnow(true);
            moveLeft(progressValue);
          }}
        >
          <View style={[styles.progressTextWrap]}>
            <Text
              style={
                progressnow ? [{fontSize: 14, color: 'white'}] : [{fontSize: 14, color: '#616161'}]
              }
            >
              진행중
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setProgressnow(false);
            moveRight(progressValue);
          }}
        >
          <View style={[styles.progressTextWrap]}>
            <Text
              style={
                progressnow ? [{fontSize: 14, color: '#616161'}] : [{fontSize: 14, color: 'white'}]
              }
            >
              진행완료
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressRow: {
    width: '100%',
    position: 'absolute',
    bottom: 11,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  progressToggle: {
    flexDirection: 'row',
    borderRadius: 17.5,
    borderColor: '#DFDFDF',
    borderWidth: 1,
    width: 138,
    height: 34,
    alignItems: 'center',

    backgroundColor: '#FCFCFC',
  },
  progressSwitch: {
    height: 30,
    backgroundColor: 'black',
    position: 'absolute',
  },
  progressTextWrap: {
    width: 68,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTextWrap2: {
    width: 68,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
