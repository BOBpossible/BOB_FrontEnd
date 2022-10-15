import React, {FC, useEffect, useState} from 'react';
import {View, Animated, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStyle} from '../../../hooks';
import AddressSearchModal from '../../../modal/AddressSearchModal';
import {useNavigation} from '@react-navigation/native';
import {DesignSystem} from '../../../assets/DesignSystem';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../../assets/CalculateLength';
import {IAddress, IHomeData} from '../../../data';
import {getAddress} from '../../../api';
import {queryKey} from '../../../api/queryKey';
import {useQuery} from 'react-query';
import {HeaderExpand} from './HeaderExpand';
import {HeaderShrink} from './HeaderShrink';
// import {color} from 'react-native-reanimated';

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

  const howtoAnimStyle = useStyle({
    opacity: animatedValue.interpolate({
      inputRange: [30, 40],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  });

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
        <HeaderShrink animatedValue={animatedValue} rewards={data?.rewards} />
        <HeaderExpand animatedValue={animatedValue} rewards={data?.rewards} />
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
    backgroundColor: 'white',
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
