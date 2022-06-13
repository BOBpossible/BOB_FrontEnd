import React, {FC, useEffect, useRef} from 'react';
import {View, Animated, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStyle} from '../hooks';
import {CircleBar} from './CircleBar';

const WIDTH = Dimensions.get('window').width;
const HEADER_HEIGHT = 209;
type AnimatedHeaderProps = {
  animatedValue: Animated.Value;
  paddingTop: number;
};

export const AnimatedHeader: FC<AnimatedHeaderProps> = ({animatedValue, paddingTop}) => {
  const heightAnimStyle = useStyle({
    height: animatedValue.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [HEADER_HEIGHT + paddingTop, 110 + paddingTop],
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
      paddingTop: paddingTop,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      flex: 1,
      width: '100%',
      backgroundColor: 'white', ////
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
      height: 30, ///
    },
    locationText: {
      fontSize: 20,
      fontWeight: '600',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 6,
      marginLeft: 16,
      marginRight: 16,
    },
    circleWrap: {
      alignItems: 'center',
      position: 'absolute',
      bottom: 10,
    },
    barWrap: {
      marginTop: 14, ///
      marginLeft: 16,
      marginRight: 16,
    },
    barStyle: {
      borderRadius: 5,
    },
    progressWrap: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: WIDTH - 32, //alignItems: center 당할 뷰 라서 옆 마진 16+16 을 빼주면 알아서 마진: 16 을 한 효과가 나타날것
          }}
        >
          <View style={{width: 290, borderWidth: 3, borderRadius: 10, borderColor: '#615EFF'}} />
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Text style={{fontSize: 22}}>7</Text>
            <Text style={{fontSize: 15}}>/</Text>
            <Text style={{fontSize: 15, lineHeight: 20}}>10</Text>
          </View>
        </View>
        <Text style={{marginBottom: 8}}>미션 10개 달성시 1,000P</Text>
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
        <View>
          <Text>JEELO</Text>
        </View>
      </View>
      <View style={[styles.progressWrap]}>
        {shrinkHeader()}
        {expandHeader()}
      </View>
    </Animated.View>
  );
};

export default AnimatedHeader;
