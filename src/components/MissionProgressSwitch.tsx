import React, {FC, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';

type switchProps = {
  progressnow: number;
  setProgressnow: any;
};
function moveLeft(progressValue: any) {
  Animated.timing(progressValue, {
    toValue: -10, //
    duration: 200, //
    useNativeDriver: false,
  }).start();
}
function moveRight(progressValue: any) {
  Animated.timing(progressValue, {
    toValue: 40, //
    duration: 200, //
    useNativeDriver: false,
  }).start();
}

export const MissionProgressSwitch: FC<switchProps> = ({progressnow, setProgressnow}) => {
  const progressValue = useState(new Animated.Value(-10))[0]; //

  const styles = StyleSheet.create({
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
    },
    progressSwitch: {
      height: '80%',
      backgroundColor: 'black',
      position: 'absolute',
      bottom: 2,
    },
  });

  return (
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
            moveLeft(progressValue);
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
            moveRight(progressValue);
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
  );
};
