import React, {FC, useEffect, useRef, useState} from 'react';
import {View, Animated, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStyle} from '../hooks';
import AddressSearchModal from '../modal/AddressSearchModal';
import {CircleBar} from './CircleBar';

const WIDTH = Dimensions.get('window').width;
const HEADER_HEIGHT = 209;
type AnimatedHeaderProps = {
  animatedValue: Animated.Value;
  paddingTop: number;
};

export const AnimatedHeader: FC<AnimatedHeaderProps> = ({animatedValue, paddingTop}) => {
  const [addressModal, setAddressModal] = useState(false);
  const heightAnimStyle = useStyle({
    height: animatedValue.interpolate({
      inputRange: [0, HEADER_HEIGHT - 100],
      outputRange: [HEADER_HEIGHT + paddingTop, 110 + paddingTop],
      extrapolate: 'clamp',
    }),
  });

  const circleAnimStyle = useStyle({
    opacity: animatedValue.interpolate({
      inputRange: [30, 70],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [30, 70],
          outputRange: [1, 0.8],
          extrapolate: 'clamp',
        }),
      },
    ],
  });

  const barAnimStyle = useStyle({
    opacity: animatedValue.interpolate({
      inputRange: [65, 75], //이거 수정 ? ??처음 130 160
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
    outerBar: {
      width: 290,
      height: 8,
      borderRadius: 10,
      backgroundColor: '#EDEDED',
    },
    innerBar: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: 8,
      borderRadius: 10,
      backgroundColor: '#615EFF',
    },
    progressWrap: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
    },
    pointWrap: {
      flexDirection: 'row',
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#AAAAF9',
      paddingTop: 3.5,
      paddingBottom: 3.5,
      paddingLeft: 8,
      paddingRight: 8,
      justifyContent: 'space-between',
      marginRight: 8,
    },
  });

  const expandHeader = () => {
    return (
      <Animated.View style={[styles.circleWrap, circleAnimStyle]}>
        <CircleBar radius={60} progress={7} />
        <Text style={{marginTop: 8}}>미션 10개 달성시 1000P</Text>
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
          <View style={[styles.outerBar]}>
            <View style={[styles.innerBar, {width: '70%'}]} />
          </View>
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
        <AddressSearchModal
          visible={addressModal}
          closeAddressModal={() => setAddressModal(false)}
        />
        <TouchableOpacity style={[styles.flexRow]} onPress={() => setAddressModal(true)}>
          <Text style={[styles.locationText]}>삼성동</Text>
          <Icon name="menu-down" size={18} color="black" />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity>
            <View style={[styles.pointWrap]}>
              <Text style={{color: '#6C69FF', fontWeight: 'bold', fontSize: 14}}>P </Text>
              <Text>999,999</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="bell-outline" size={24} />
          </TouchableOpacity>
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
