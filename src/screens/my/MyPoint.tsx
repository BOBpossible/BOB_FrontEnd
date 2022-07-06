import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {MyPointList} from '../../components/My/MyPointList';
import {DesignSystem} from '../../assets/DesignSystem';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';

type Props = NativeStackScreenProps<MyStackParamList, 'MyPoint'>;

const dummyMission = [
  {
    date: '2022-12-03T16:01:34.864Z',
    title: '마라마라마라탕',
    subTitle: '20000원 이상 식사',
    point: -500,
  },
  {
    date: '2022-12-03T16:01:34.864Z',
    title: '어쩌고 맛집',
    subTitle: '15000원 이상',
    point: 3000,
  },
  {
    date: '2022-11-13T16:01:34.864Z',
    title: '포인트 전환',
    point: -400,
  },
  {
    date: '2022-06-02T16:01:34.864Z',
    title: '와라라라 맛집',
    subTitle: '18000원 이상',
    point: 500,
  },
];
export const MyPoint = ({navigation, route}: Props) => {
  const [point, setPoint] = useState<number>(route.params.point);

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F8F8F8'}]}>
        <MyHeader goBack={goBack} title={'내 포인트'} />
        <View style={{backgroundColor: '#FFFFFF'}}>
          <View style={[styles.myPointWrap, styles.marginLR]}>
            <View>
              <Text style={[DesignSystem.body2Lt, {color: '#616161'}]}>내 포인트</Text>
              <Text style={{color: '#111111', fontFamily: 'Pretendard-SemiBold', fontSize: 24}}>
                {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}P
              </Text>
            </View>
            <TouchableOpacity style={[styles.changePointView]}>
              <Text
                style={{color: '#FFFFFF', fontFamily: 'Pretendard-Medium', fontSize: 12}}
                onPress={() => navigation.navigate('MyChangePoint', {point: point})}
              >
                포인트 전환 신청
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.pointListWrap]}>
          <View style={[styles.marginLR]}>
            <Text style={[DesignSystem.subtitle2, {marginTop: 16, color: '#111111'}]}>포인트 내역</Text>
            <FlatList
              style={{marginTop: 18}}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={10}
              data={dummyMission}
              renderItem={({item}) => (
                <>
                  <MyPointList
                    date={item.date}
                    title={item.title}
                    subTitle={item.subTitle}
                    point={item.point}
                  />
                </>
              )}
              ItemSeparatorComponent={() => <View style={{marginTop: 32}} />}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  marginLR: {
    marginLeft: 16,
    marginRight: 16,
  },
  myPointWrap: {
    height: hp(calHeight(85)),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  changePointView: {
    backgroundColor: '#2A2A2A',
    borderRadius: 7,
    width: hp(calHeight(90)),
    height: wp(calWidth(32)),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointListWrap: {
    backgroundColor: 'white',
    flex: 1,
  },
});
