import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../assets/DesignSystem';

type DoneModalProps = {
  visible: boolean;
  closeDoneModal: () => void;
  category: string;
  point?: number;
};

const DoneModal: FC<DoneModalProps> = ({visible, closeDoneModal, category, point}) => {
  return (
    <Modal visible={visible} animationType="fade">
      <View style={[styles.flex]}>
        <View style={[styles.flex, DesignSystem.centerArrange]}>
          <Icon name="check" size={71} color="#6C69FF" />
          {category === '리뷰' ? (
            <Text style={[styles.purpleTitleText]}>리뷰 등록 완료!</Text>
          ) : category === '입금' ? (
            <>
              <Text style={[styles.blackTitleText]}>입금 신청이 완료되었습니다.</Text>
              <Text style={[DesignSystem.body2Long, {color: '#616161', marginTop: 6}]}>
                입금은 심사 후 매주 수요일에 일괄 송금됩니다.
              </Text>
            </>
          ) : category === '성공' ? (
            <>
              <Text style={[styles.blackTitleText]}>미션 성공!</Text>
              <Text style={[DesignSystem.body2Lt, {color: '#616161', marginTop: 9}]}>
                {point}P가 적립되었습니다!
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
    backgroundColor: '#6C69FF',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Pretendard-Medium',
    color: '#FFFFFF',
  },
});

// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import React, {FC, useEffect, useState} from 'react';
// import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {MyStackParamList} from '../nav/MyNavigator';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {DesignSystem} from '../assets/DesignSystem';

// type DoneScreenProps = {
//   goNext?: () => void;
//   category?: string;
//   point?: number;
// };
// type Props = NativeStackScreenProps<MyStackParamList, 'DoneScreen'>;

// const DoneScreen = ({navigation, route}: Props) => {
// //   const goNext = () => {
// //     navigation.reset({routes: [{name: 'MainNavigator'}]});
// //   };
//   const goNext = useState(route.params.goNext);
//   const category = useState<string>(route.params.category);
//   const point = route.params.point;
//   console.log('category: ', category);
//   useEffect(() => {
//     const id = setTimeout(() => {
//       navigation.navigate('HowTo1');
//     }, 1500);
//     return () => {
//       clearTimeout(id);
//     };
//   }, []);

//   return (
//     <SafeAreaView style={[styles.flex, {backgroundColor: 'white'}]}>
//       <View style={[styles.flex, DesignSystem.centerArrange]}>
//         <Icon name="check" size={71} color="#6C69FF" />
//         {String(category) === '리뷰' ? (
//           <Text style={[styles.blackTitleText]}>리뷰 등록이 완료되었습니다.</Text>
//         ) : String(category) === '입금' ? (
//           <>
//             <Text style={[styles.blackTitleText]}>입금 신청이 완료되었습니다.</Text>
//             <Text style={[DesignSystem.body2Long, {color: '#616161', marginTop: 6}]}>
//               입금은 심사 후 매주 수요일에 일괄 송금됩니다.
//             </Text>
//           </>
//         ) : String(category) === '성공' ? (
//           <>
//             <Text style={[styles.blackTitleText]}>미션 성공!</Text>
//             <Text style={[DesignSystem.body2Lt, {color: '#616161', marginTop: 9}]}>
//               {point}P가 적립되었습니다!
//             </Text>
//           </>
//         ) : (
//           <Text style={[styles.purpleTitleText]}>가입완료</Text>
//         )}
//       </View>
//       {String(category) === '리뷰' || String(category) === '입금' ? (
//         <TouchableOpacity onPress={goNext} style={[styles.buttonWrap]}>
//           <View style={[styles.buttonStyle]}>
//             <Text style={[styles.buttonText]}>홈으로 돌아가기</Text>
//           </View>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity onPress={goNext} style={[styles.buttonWrap]}>
//           <View style={[styles.buttonStyle]}>
//             <Text style={[styles.buttonText]}>확인</Text>
//           </View>
//         </TouchableOpacity>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({

// });

// export default DoneScreen;
