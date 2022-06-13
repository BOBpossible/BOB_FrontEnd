import React, {FC, useEffect, useRef} from 'react';
import {View, Animated, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStyle} from '../hooks';
import {CircleBar} from './CircleBar';

const HEADER_HEIGHT = 209;
type AnimatedHeaderProps = {
  animatedValue: Animated.Value;
  paddingTop: number;
};

export const AnimatedHeader: FC<AnimatedHeaderProps> = ({animatedValue, paddingTop}) => {
  const heightAnimStyle = useStyle({
    height: animatedValue.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [HEADER_HEIGHT + paddingTop, 99 + paddingTop],
      extrapolate: 'clamp',
    }),
  });

  const circleAnimStyle = useStyle({
    opacity: animatedValue.interpolate({
      inputRange: [100, 140],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [50, 150],
          outputRange: [1, 0.4],
          extrapolate: 'clamp',
        }),
      },
    ],
  });

  const barAnimStyle = useStyle({
    opacity: animatedValue.interpolate({
      inputRange: [130, 160], //이거 수정 ? ??처음 130 160
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  });

  const styles = StyleSheet.create({
    headerWrap: {
      paddingTop,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      flex: 1,
      backgroundColor: 'white', ////
      width: '100%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.35,
      shadowRadius: 3.84,
      elevation: 5,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 29, ///
    },
    locationText: {
      fontSize: 20,
      fontWeight: '600',
    },
    header: {
      marginTop: 6,
      marginLeft: 16,
      marginRight: 16,
    },
    circleWrap: {
      alignItems: 'center',
      position: 'absolute',
      bottom: 5,
    },
    barWrap: {
      marginTop: 14, ///
      marginLeft: 16,
    },
    barStyle: {
      borderRadius: 5,
    },
    progressWrap: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
    },
  });

  const expandHeader = () => {
    return (
      <Animated.View style={[styles.circleWrap, circleAnimStyle]}>
        <CircleBar radius={60} progress={7} />
        <Text style={{marginTop: 5}}>미션 10개 달성시 1000P</Text>
      </Animated.View>
    );
  };

  const shrinkHeader = () => {
    return (
      <Animated.View style={[barAnimStyle, styles.barWrap]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '80%', borderWidth: 5, borderColor: '#615EFF'}} />
          <Text> 7/10</Text>
        </View>
        <Text style={{marginTop: 5}}>미션 10개 달성시 1000P</Text>
      </Animated.View>
    );
  };

  return (
    <Animated.View style={[styles.headerWrap, heightAnimStyle]}>
      <View style={[styles.header]}>
        <TouchableOpacity style={[styles.flexRow]}>
          <Text style={[styles.locationText]}>삼성동</Text>
          <Icon name="menu-down" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <View style={[styles.progressWrap]}>
        {shrinkHeader()}
        {expandHeader()}
      </View>
    </Animated.View>
  );
};

export default AnimatedHeader;
