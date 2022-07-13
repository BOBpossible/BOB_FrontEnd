import React from 'react';
import type {FC} from 'react';
import {Animated, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../assets/DesignSystem';

type DoneModalProps = {
  visible: boolean;
  closeDoneModal: () => Promise<void>;
  category: string;
  point?: number;
};

const DoneModal: FC<DoneModalProps> = ({visible, closeDoneModal, category, point}) => {
  // const scaleAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = new Animated.Value(1);
  const animateTextSize = (n: number) => {
    Animated.timing(scaleAnim, {
      toValue: n,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  animateTextSize(3);
  return (
    <Modal visible={visible} animationType="fade">
      <View style={[styles.flex]}>
        <View style={[styles.flex, DesignSystem.centerArrange]}>
          {category === '성공' ? (
            <Animated.View style={{marginTop: 20, transform: [{scale: scaleAnim}]}}>
              <Image
                style={{
                  width: 90,
                  height: 69,
                  position: 'relative',
                  // left: -40,
                  // top: -20,
                }}
                source={require('../assets/images/pollen.png')}
              />
              <Image
                style={{
                  width: 30,
                  height: 30,
                  position: 'relative',
                  left: 30,
                  top: -40,
                }}
                source={require('../assets/images/coin.png')}
              />
              <Text
                style={{
                  fontSize: 9,
                  position: 'relative',
                  left: 35,
                  top: -65,
                }}
              >
                {point}P
              </Text>
            </Animated.View>
          ) : (
            <Icon name="check" size={71} color="#6C69FF" />
          )}
          {category === '리뷰' ? (
            <Text style={[styles.purpleTitleText]}>리뷰 등록 완료!</Text>
          ) : category === '입금' ? (
            <>
              <Text style={[styles.blackTitleText]}>입금 신청이 완료되었습니다.</Text>
              <Text style={[DesignSystem.body2Long, {color: '#616161', marginTop: 6}]}>
                입금은 심사 후 매주 수요일에 일괄 송금됩니다.
              </Text>
            </>
          ) : category === '문의' ? (
            <>
              <Text style={[styles.blackTitleText]}>문의 접수 완료!</Text>
              <Text style={[DesignSystem.body2Lt, {color: '#616161', marginTop: 9}]}>
                문의가 접수되었습니다.
              </Text>
            </>
          ) : category === '신고' ? (
            <>
              <Text style={[styles.blackTitleText]}>신고 접수 완료!</Text>
              <Text style={[DesignSystem.body2Lt, {color: '#616161', marginTop: 9}]}>
                신고가 접수되었습니다.
              </Text>
            </>
          ) : (
            <Text style={[styles.purpleTitleText]}>가입완료</Text>
          )}
        </View>
        <TouchableOpacity onPress={closeDoneModal} style={[styles.buttonWrap]}>
          <View style={[styles.buttonStyle]}>
            <Text style={[styles.buttonText]}>확인</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DoneModal;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  blackTitleText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#111111',
    marginTop: 32,
  },
  purpleTitleText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    lineHeight: 28,
    color: '#7879F7',
    marginTop: 32,
  },
  buttonWrap: {justifyContent: 'center', alignItems: 'center', margin: 20},
  buttonStyle: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Pretendard-Medium',
    color: '#FFFFFF',
  },
});
