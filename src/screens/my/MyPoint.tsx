import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {MyPointList} from '../../components/My/MyPointList';
import {DesignSystem} from '../../assets/DesignSystem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';
import {useInfiniteQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getPointsList} from '../../api';
import {MyPageNo} from '../../components/My/MyPageNo';

type Props = NativeStackScreenProps<MyStackParamList, 'MyPoint'>;
export type PointsListContent = {
  date: string;
  point: number;
  subTitle: string;
  title: string;
};

export type PointsListType = {
  result: PointsListContent[];
  isLast: boolean;
  // nextPage: number;
  pageNumber: number;
};
export const MyPoint = ({navigation, route}: Props) => {
  const [point, setPoint] = useState<number>(route.params.point);

  const DataPointsList = useInfiniteQuery(
    queryKey.POINTSLIST,
    ({pageParam}) => getPointsList({pageParam}),
    {
      getNextPageParam: (lastPage, pages) => {
        return pages.length;
      },
    },
  );
  // console.log('DataPointsList', DataPointsList.data?.pages[0].data.result.point.content);
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#FFFFFF'}]}>
        <MyHeader goBack={goBack} title={'내 포인트'} />
        <View style={[styles.pointListWrap]}>
          <FlatList
            ListHeaderComponent={
              <>
                <View style={{backgroundColor: '#FFFFFF'}}>
                  <View style={[styles.myPointWrap, styles.marginLR]}>
                    <View>
                      <Text style={[DesignSystem.body2Lt, DesignSystem.grey10]}>내 포인트</Text>
                      <Text style={[DesignSystem.h1SB, DesignSystem.grey17]}>
                        {DataPointsList.data?.pages[0].data.result.totalPoints
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        P
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.changePointView]}
                      onPress={() => navigation.navigate('MyChangePoint', {point: point})}
                    >
                      <Text
                        style={{color: '#FFFFFF', fontFamily: 'Pretendard-Medium', fontSize: 12}}
                      >
                        포인트 전환 신청
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{backgroundColor: '#F8F8F8', width: '100%', height: 8}} />
                <Text
                  style={[
                    DesignSystem.subtitle2,
                    {marginTop: 16, marginBottom: 20, color: '#111111', marginLeft: 16},
                  ]}
                >
                  포인트 내역
                </Text>
                {DataPointsList.isSuccess &&
                DataPointsList.data?.pages[0].data.result.point.content.length === 0 ? (
                  <View style={{marginTop: 100}}>
                    <MyPageNo isPoint={true} />
                  </View>
                ) : (
                  <></>
                )}
              </>
            }
            refreshControl={
              <RefreshControl
                onRefresh={() => DataPointsList.refetch()}
                refreshing={DataPointsList.isFetching}
              />
            }
            showsVerticalScrollIndicator={false}
            data={DataPointsList.data?.pages}
            onEndReached={() => {
              DataPointsList.fetchNextPage();
            }}
            renderItem={({item}) => (
              <>
                {item.data.result.point.content.map((e: any, i: number) => {
                  return (
                    <View key={i} style={{marginLeft: 16, marginRight: 16}}>
                      <MyPointList
                        date={e.date}
                        title={e.title}
                        subTitle={e.subTitle}
                        point={e.point}
                      />
                    </View>
                  );
                })}
              </>
            )}
          />
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
    height: hp(calHeight(32)),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  pointListWrap: {
    backgroundColor: 'white',
    flex: 1,
  },
});
