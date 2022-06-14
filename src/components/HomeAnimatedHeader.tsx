import React, {FC, useEffect, useRef, useState} from 'react';
import {View, Animated, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStyle} from '../hooks';
import AddressSearchModal from '../modal/AddressSearchModal';
import {CircleBar} from './HomeCircleBar';

const WIDTH = Dimensions.get('window').width;
const HEADER_HEIGHT = 210;
type AnimatedHeaderProps = {
  animatedValue: Animated.Value;
  paddingTop: number;
};

export const AnimatedHeader: FC<AnimatedHeaderProps> = ({animatedValue, paddingTop}) => {
  const [addressModal, setAddressModal] = useState(false);
  const barProgressValue = useRef(new Animated.Value(0)).current;

  //헤더 길이 바꿔주는 애니메이션 Main.tsx의 스크롤 위치에 따라 변한다
  const heightAnimStyle = useStyle({
    height: animatedValue.interpolate({
      inputRange: [0, HEADER_HEIGHT - 100], //스크롤100 까지는 같은 속도로 스크롤 업
      outputRange: [HEADER_HEIGHT + paddingTop, 110 + paddingTop], //아이폰을 위한 insets.top 추가
      extrapolate: 'clamp',
    }),
  });

  const barProgressFill = (progress: number) => {
    Animated.timing(barProgressValue, {
      toValue: progress * 10,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  const widthStyle = useStyle({
    width: barProgressValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    }),
  });
  useEffect(() => {
    barProgressFill(7);
  }, []);

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
      inputRange: [65, 75],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  });

  const howtoAnimStyle = useStyle({
    opacity: animatedValue.interpolate({
      inputRange: [30, 40],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
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
        <View style={[styles.shrinkHeaderWrap]}>
          <View style={[styles.outerBar]}>
            <Animated.View style={[styles.innerBar, widthStyle]} />
          </View>
          <View style={[styles.shrinkHeaderTextWrap]}>
            <Text style={[styles.shrinkHeaderTextOne]}>7</Text>
            <Text style={[styles.shrinkHeaderTextTwo]}>/</Text>
            <Text style={[styles.shrinkHeaderTextThree]}>10</Text>
          </View>
        </View>
        <Text>미션 10개 달성시 1,000P</Text>
      </Animated.View>
    );
  };

  return (
    <Animated.View style={[styles.headerWrap, heightAnimStyle, {paddingTop}]}>
      <View style={[styles.header]}>
        <AddressSearchModal
          visible={addressModal}
          closeAddressModal={() => setAddressModal(false)}
        />
        <TouchableOpacity style={[styles.flexRow]} onPress={() => setAddressModal(true)}>
          <Text style={[styles.locationText]}>삼성동</Text>
          <Icon name="menu-down" size={18} color="black" />
        </TouchableOpacity>
        <View style={[styles.flexRow]}>
          <TouchableOpacity>
            <View style={[styles.pointWrap]}>
              <Text style={[styles.pointP]}>P </Text>
              <Text style={[styles.pointText]}>999,999</Text>
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
      <TouchableOpacity style={[{position: 'absolute', top: 60 + paddingTop, right: 20}]}>
        <Animated.View style={[howtoAnimStyle, styles.flexRow]}>
          <Text style={[styles.howtoText]}>사용방법</Text>
          <View style={[styles.questionWrap]}>
            <Text>?</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
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
    marginBottom: 8,
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
  pointP: {
    color: '#6C69FF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pointText: {fontSize: 14, fontWeight: '600', color: '#555555'},
  shrinkHeaderWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH - 32, //alignItems: center 당할 뷰 라서 옆 마진 16+16 을 빼주면 알아서 마진: 16 을 한 효과가 나타날것
    marginBottom: 6,
  },
  shrinkHeaderTextWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  shrinkHeaderTextOne: {
    fontSize: 22,
  },
  shrinkHeaderTextTwo: {
    fontSize: 15,
  },
  shrinkHeaderTextThree: {
    fontSize: 15,
  },
  howtoText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#7879F7',
  },
  questionWrap: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
