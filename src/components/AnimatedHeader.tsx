import React, {useRef} from 'react';
import {View, Animated, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HEADER_HEIGHT = 200;

const AnimatedHeader = ({animatedValue}) => {
  const insets = useSafeAreaInsets();

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        rught: 0,
        zIndex: 10,
        height: headerHeight,
        backgroundColor: 'lightblue',
        width: '100%',
      }}
    ></Animated.View>
  );
};

export default AnimatedHeader;
