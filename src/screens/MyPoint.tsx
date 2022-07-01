import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../nav/MyNavigator';
import {MyHeader} from '../components/MyHeader';
import {MyPointList} from '../components/MyPointList';

type Props = NativeStackScreenProps<MyStackParamList, 'MyPoint'>;
const dummyMission = [
  {
    date: '6.24',
    storeId: 1,
    storeName: '마라마라마라탕',
    mission: '20000원 이상',
    status: 1,
    point: 200,
  },
  {
    date: '6.9',
    storeId: 13,
    storeName: '어쩌고 맛집',
    mission: '15000원 이상',
    status: 1,
    point: 3000,
  },
  {
    date: '6.4',
    storeId: 144,
    storeName: '저쩌고 댕맛집',
    mission: '17000원 이상',
    status: 0,
    point: 400,
  },
  {
    date: '6.15',
    storeId: 1433,
    storeName: '와라라라 맛집',
    mission: '18000원 이상',
    status: 0,
    point: 500,
  },
];
export const MyPoint = ({navigation, route}: Props) => {
  const [userpoint, setUserpoint] = useState<number>(route.params.point);

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={[styles.flex]}>
      <MyHeader goBack={goBack} title={'내 포인트'} />
      <View style={{backgroundColor: '#FFFFFF'}}>
        <View style={[styles.marginLR, styles.myPointWrap]}>
          <View style={[styles.myPointView]}>
            <Text style={{color: '#616161', fontFamily: 'Pretendard-Light'}}>내 포인트</Text>
            <Text style={{color: '#111111', fontFamily: 'bold', fontSize: 24}}>
              {userpoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
          <TouchableOpacity style={[styles.changePointView]}>
            <Text style={{color: '#FFFFFF', fontFamily: 'Pretendard-Medium', fontSize: 12}}>포인트 전환 신청</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* 포인트내역 */}
      <View style={[styles.pointListWrap]}>
        <View style={[styles.marginLR]}>
          <Text
            style={{marginTop: 16, color: '#111111', fontFamily: 'Pretendard-Medium', fontSize: 19}}
          >
            포인트 내역
          </Text>
          <FlatList
            style={{marginTop: 12}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 60}}
            scrollEventThrottle={10}
            data={dummyMission}
            renderItem={({item}) => (
              <>
                <MyPointList
                  date={item.date}
                  storeId={item.storeId}
                  storeName={item.storeName}
                  mission={item.mission}
                  status={item.status}
                  point={item.point}
                />
              </>
            )}
            ItemSeparatorComponent={() => <View style={{marginTop: 32}} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  marginLR: {
    marginLeft: 16,
    marginRight: 16,
  },
  myPointWrap: {
    height: 96,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    marginBottom: 8,
  },
  myPointView: {
  },
  changePointView: {
    backgroundColor: '#2A2A2A',
    borderRadius: 7,
    width: 90,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointListWrap: {
    backgroundColor: 'white',
    flex: 1,
  },
});
