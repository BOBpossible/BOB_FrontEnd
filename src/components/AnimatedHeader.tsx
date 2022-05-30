import React, {FC, useRef} from 'react';
import {View, Animated, Text, StyleSheet} from 'react-native';
import {StyleProp} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStyle} from '../hooks';

const HEADER_HEIGHT = 250;
type AnimatedHeaderProps = {
  animatedValue: Animated.Value;
};
const AnimatedHeader: FC<AnimatedHeaderProps> = ({animatedValue}) => {
  const heightAnimStyle = useStyle({
    height: animatedValue.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [HEADER_HEIGHT, 120],
      extrapolate: 'clamp',
    }),
  });

  const styles = StyleSheet.create({
    headerWrap: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: 'white',
      width: '100%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.35,
      shadowRadius: 3.84,
      elevation: 5,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationText: {
      fontSize: 20,
      fontWeight: '600',
    },
    headerRow1: {
      margin: 15,
    },
  });

  const expandHeader = () => {
    return (
      <View>
        <Text>CIRCLE PROGRESS</Text>
      </View>
    );
  };

  const shrinkHeader = () => {
    return (
      <View>
        <Text>BAR HEADER</Text>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.headerWrap, heightAnimStyle]}>
      <View style={[styles.flexRow, styles.headerRow1]}>
        <TouchableOpacity style={[styles.flexRow]}>
          <Text style={[styles.locationText]}>삼성동</Text>
          <Icon name="menu-down" size={18} color="black" />
        </TouchableOpacity>
      </View>

      {expandHeader()}
    </Animated.View>
  );
};

export default AnimatedHeader;
