import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStyle} from '../../hooks';
import AddressSearchModal from '../../modal/AddressSearchModal';
import {CircleBar} from './HomeCircleBar';
import {useNavigation} from '@react-navigation/native';
import {DesignSystem} from '../../assets/DesignSystem';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import {IAddress, IHomeData} from '../../data';
import {getAddress} from '../../api';
import {queryKey} from '../../api/queryKey';
import {useQuery} from 'react-query';
// import {color} from 'react-native-reanimated';

const WIDTH = Dimensions.get('window').width;
const HEADER_HEIGHT = Platform.OS === 'ios' ? hp(25.8) : hp(28.6);
type AnimatedHeaderProps = {
  animatedValue: Animated.Value;
  paddingTop: number;
  data?: IHomeData;
  newNotiCount: number;
};

export const AnimatedHeader: FC<AnimatedHeaderProps> = ({
  animatedValue,
  paddingTop,
  data,
  newNotiCount,
}) => {
  useEffect(() => {
    const scrollListenerId = animatedValue.addListener(({value}) => setScrollOffset(value));

    return animatedValue.removeListener(scrollListenerId);
  }, [animatedValue]);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [addressModal, setAddressModal] = useState(false);
  const barProgressValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const Address = useQuery<IAddress>(queryKey.ADDRESS, getAddress);
  //헤더 길이 바꿔주는 애니메이션 Main.tsx의 스크롤 위치에 따라 변한다
  const heightAnimStyle = useStyle({
    height: animatedValue.interpolate({
      inputRange: [0, HEADER_HEIGHT - hp(calHeight(100))], //스크롤100 까지는 같은 속도로 스크롤 업
      outputRange: [
        HEADER_HEIGHT + paddingTop,
        Platform.OS === 'ios' ? hp(13.55) + paddingTop : hp(calHeight(110)) + paddingTop,
      ], //아이폰을 위한 insets.top 추가
      extrapolate: 'clamp',
    }),
  });

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

  const widthStyle = useStyle({
    width: barProgressValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    }),
  });
  useEffect(() => {
    barProgressFill(data.rewards);
  }, [barProgressFill, data.rewards]);

  const circleAnimStyle = useStyle({
    opacity: animatedValue.interpolate({
      inputRange: [30, 60],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [30, 60],
          outputRange: [1, 0.8],
          extrapolate: 'clamp',
        }),
      },
    ],
  });

  const barAnimStyle = useStyle({
    opacity: animatedValue.interpolate({
      inputRange: [60, 65],
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
        <CircleBar progress={data?.rewards} />
        <View style={{flexDirection: 'row'}}>
          <Text style={[DesignSystem.grey17, styles.circleBar]}>미션 10개 달성시 </Text>
          <Text style={[DesignSystem.purple5, styles.circleBar]}>1000P</Text>
        </View>
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
            <Text style={[styles.shrinkHeaderTextOne]}>{data?.rewards} </Text>
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

  return (
    <Animated.View style={[styles.headerWrap, heightAnimStyle, {paddingTop}]}>
      <View style={[styles.header]}>
        <AddressSearchModal
          visible={addressModal}
          closeAddressModal={() => setAddressModal(false)}
        />
        <TouchableOpacity style={[styles.flexRow]} onPress={() => setAddressModal(true)}>
          <Text style={[DesignSystem.subtitle2, {color: '#000000'}]}>
            {Address.data?.addressDong}
          </Text>
          <Icon name="menu-down" size={20} color="black" />
        </TouchableOpacity>
        <View style={[styles.flexRow, {paddingRight: 10}]}>
          <TouchableOpacity onPress={() => navigation.navigate('MyPoint', {point: data?.point})}>
            <View style={[styles.pointWrap]}>
              <Text style={[styles.pointP]}>P </Text>
              <Text style={[styles.pointText]}>
                {data?.point?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications', {userId: 0})}>
            {newNotiCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>{newNotiCount}</Text>
              </View>
            )}

            <Icon name="bell-outline" size={24} color="#323232" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.progressWrap]}>
        {shrinkHeader()}
        {expandHeader()}
      </View>
      <TouchableOpacity
        style={[{position: 'absolute', top: 50 + paddingTop, right: 20}]}
        onPress={() => {
          navigation.navigate('HowToLong');
        }}
        disabled={scrollOffset > 40 ? true : false}
      >
        <Animated.View style={[howtoAnimStyle, styles.flexRow]}>
          <Text style={[DesignSystem.body1Lt, DesignSystem.purple5]}>사용방법</Text>
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
    shadowColor: '#000C8A',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderColor: '#E8E8E8',
    borderWidth: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30, ///
    marginRight: 0,
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
    bottom: 0,
  },
  barWrap: {
    marginTop: Platform.OS === 'ios' ? hp(calHeight(12, true)) : hp(calHeight(12)), ///
    marginLeft: 16,
    marginRight: 16,
    marginBottom: Platform.OS === 'ios' ? hp(calHeight(8, true)) : hp(calHeight(8)),
  },
  barStyle: {
    borderRadius: 5,
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
  progressWrap: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  pointWrap: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#615EFF',
    paddingTop: 3.5,
    paddingBottom: 3.5,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'space-between',
    marginRight: 3,
  },
  pointP: {
    color: '#6C69FF',
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pointText: {fontSize: 14, color: '#555555', fontFamily: 'Pretendard-SemiBold'},
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
  howtoText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#7879F7',
  },
  questionWrap: {
    width: 20,
    height: 20,
    borderRadius: 18,
    backgroundColor: '#DFDFDF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  circleBar: {
    marginTop: Platform.OS === 'ios' ? hp(calHeight(8, true)) : hp(calHeight(8)),
    marginBottom: Platform.OS === 'ios' ? hp(calHeight(14, true)) : hp(calHeight(14)),
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
    lineHeight: 22,
  },
  notificationBadge: {
    borderRadius: 16,
    minWidth: 16,
    height: 16,
    backgroundColor: '#E24C44',
    position: 'absolute',
    left: 12,
    top: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2.5,
  },
  notificationCount: {
    fontSize: 11,
    lineHeight: 11,
    fontFamily: 'Pretendard-SemiBold',
    color: 'white',
  },
});
