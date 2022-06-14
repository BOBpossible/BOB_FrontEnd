import React, {FC, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';

type switchProps = {
  progressnow: number;
  setProgressnow: any;
};
function moveLeft(progressValue: any) {
  Animated.timing(progressValue, {
    toValue: -15, //
    duration: 200, //
    useNativeDriver: false,
  }).start();
}
function moveRight(progressValue: any) {
  Animated.timing(progressValue, {
    toValue: 41, //
    duration: 200, //
    useNativeDriver: false,
  }).start();
}

export const MissionProgressSwitch: FC<switchProps> = ({progressnow, setProgressnow}) => {
  const progressValue = useState(new Animated.Value(-15))[0]; //

  return (
    <View style={[styles.progressRow]}>
      <View style={[styles.progressToggle]}>
        <Animated.View
          style={
            progressnow === 0
              ? [
                  styles.progressSwitch,
                  {width: 66, borderRadius: 21, transform: [{translateX: progressValue}]},
                ]
              : [
                  styles.progressSwitch,
                  {width: 77, borderRadius: 21, transform: [{translateX: progressValue}]},
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
    width: 138,
    height: 34,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
  },
  progressSwitch: {
    height: 30,
    backgroundColor: 'black',
    position: 'absolute',
  },
});
