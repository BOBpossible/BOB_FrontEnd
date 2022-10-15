import React, {FC, useCallback, useEffect, useRef} from 'react';
import {View, Animated, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import {useStyle} from '../../../hooks';
import {DesignSystem} from '../../../assets/DesignSystem';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../../assets/CalculateLength';

const WIDTH = Dimensions.get('window').width;

type HeaderShrinkProps = {
  animatedValue: Animated.Value;
  rewards: number | undefined;
};

export const HeaderShrink: FC<HeaderShrinkProps> = ({animatedValue, rewards}) => {
  const barProgressValue = useRef(new Animated.Value(0)).current;

  const barProgressFill = useCallback(
    (progress: number) => {
      Animated.timing(barProgressValue, {
        toValue: progress * 10,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    },
    [barProgressValue],
  );
  const barAnimStyle = useStyle({
    opacity: animatedValue.interpolate({
      inputRange: [60, 65],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  });
  const widthStyle = useStyle({
    width: barProgressValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    }),
  });

  useEffect(() => {
    barProgressFill(rewards as number);
  }, [barProgressFill, rewards]);

  return (
    <Animated.View style={[barAnimStyle, styles.barWrap]}>
      <View style={[styles.shrinkHeaderWrap]}>
        <View style={[styles.outerBar]}>
          <Animated.View style={[styles.innerBar, widthStyle]} />
        </View>
        <View style={[styles.shrinkHeaderTextWrap]}>
          <Text style={[styles.shrinkHeaderTextOne]}>{rewards} </Text>
          <Text style={[styles.shrinkHeaderTextTwo]}>/ </Text>
          <Text style={[styles.shrinkHeaderTextThree]}>10</Text>
        </View>
      </View>
      <View>
        <Text>
          <Text style={[styles.shrinkHeaderMissionText, DesignSystem.grey10]}>
            미션 10개 달성시
          </Text>
          <Text style={[styles.shrinkHeaderMissionText, DesignSystem.purple5]}> 1,000P</Text>
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  barWrap: {
    marginTop: Platform.OS === 'ios' ? hp(calHeight(12, true)) : hp(calHeight(12)), ///
    marginLeft: 16,
    marginRight: 16,
    marginBottom: Platform.OS === 'ios' ? hp(calHeight(8, true)) : hp(calHeight(8)),
  },
  outerBar: {
    width: '85%',
    height: Platform.OS === 'ios' ? hp(calHeight(6, true)) : hp(calHeight(6)),
    borderRadius: 5,
    backgroundColor: '#EDEDED',
  },
  innerBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: Platform.OS === 'ios' ? hp(calHeight(6, true)) : hp(calHeight(6)),
    borderRadius: 5,
    backgroundColor: '#615EFF',
  },
  shrinkHeaderWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH - 32, //alignItems: center 당할 뷰 라서 옆 마진 16+16 을 빼주면 알아서 마진: 16 을 한 효과가 나타날것
  },
  shrinkHeaderTextWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  shrinkHeaderTextOne: {
    fontSize: 22,
    fontFamily: 'Pretendard-Light',
    color: '#111111',
  },
  shrinkHeaderTextTwo: {
    fontSize: 15,
    fontFamily: 'Pretendard-Light',
    color: '#7D7D7D',
  },
  shrinkHeaderTextThree: {
    fontSize: 15,
    fontFamily: 'Pretendard-Light',
    color: '#7D7D7D',
  },
  shrinkHeaderMissionText: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'Pretendard-Medium',
  },
});
