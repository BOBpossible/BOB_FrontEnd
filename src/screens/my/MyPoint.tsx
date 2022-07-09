import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {MyPointList} from '../../components/My/MyPointList';
import {DesignSystem} from '../../assets/DesignSystem';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';
import {customAxios} from '../../api/customAxios';
import {useInfiniteQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';

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
  // ```//한 페이지단위래
  // {
  //   result: {
  //     totalPoints: 0
  //     point: {
  //       content: [
  //         {
  //           date: . .
  //         }
  //       ],
  //       last: true,
  //     },
  //   }
  // }
  // ```
  //마이페이지 - 나의 포인트 내역 조회
  const getPointsList = async () => {
    const response = await customAxios().get('/api/v1/points/list/me', {
      params: {
        pageNumber: 0,
        pageSize: 5, //pageSize ISSUE .  .. . . . . . .
      },
    });
    // console.log('여여ㅕㅇ',response);//response.data.result 하면 스웨커대로
    // console.log(data.result.point);x
    // console.log('d', data.result.point.content[0].date);
    // return {
    //   result: data.result.point.content,
    //   isLast: data.result.point.last, //그페이지가 끝인건지 아닌지TF
    //   // nextPage: pageParam + 1,
    //   pageNumber: data.result.point.pageable.pageNumber,
    //   totalPoints: data.result.totalPoints,
    // };
    // console.log(response.data);
    //{"code": 1000, "isSuccess": true, "message": ["요청에 성공하였습 니다."], "result": {"point": {"content": [Array], "empty": false, "first": true, "last": false, "number": 0, "numberOfElements": 20, "pageable": [Object], "size": 20, "sort": [Object]}, "totalPoints": 750}}
    return response;
  };

  //inf시도
  const {isLoading, data, hasNextPage, fetchNextPage} = useInfiniteQuery(
    queryKey.POINTSLIST,
    getPointsList,
    {
      //첫번째인자 - 호출된 가장 마지막에 있는 페이지 데이터
      //두번째인자 - 호출된 모든 페이지 데이터
      //(벨로그) 현재 받아온데이터 , 현재 쌓여있는 전체 데이터. 페이지정보 받아올수있다면 사용하면될것
      // lastPage(첫인자)엔 저 위에 getPointsList에서 리턴한 {result:~, isLAst ~~}
      //getNextPageParam= retrives # of next page
      getNextPageParam: (lastPage, _allPages) => {
        // console.log('요건몰까',lastPage.data.result.point.last);  //스웨거대로임
        if (!lastPage.data.result.point.last) return lastPage.data.result.point.pageable.pageNumber + 1; //다음 페이지를 호출할 때 사용 될 pageParam
        // if (!lastPage.isLast) return _allPages.length + 1; // ? _ ?
        return undefined;
      },
    },
  );
  // console.log('dd',data?.pages[0].data.result.point.content[0]); //더미데이터같은형식
  console.log('총포인트', data?.pages[0].data.result.totalPoints);
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  //
  // console.log('rrr', res.data?.pages);
  // [{"isLast": false, "pageNumber": 0, "result": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "totalPoints": 750}]
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
              <Text style={[DesignSystem.h1SB, {color: '#111111'}]}>
                {data?.pages[0].data.result.totalPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} P
                {/* {DataPointsList.totalPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}P */}
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
              showsVerticalScrollIndicator={true}
              scrollEventThrottle={10}
              // data={dummyMission}
              data={data?.pages[0].data.result.point.content}
              onEndReached={loadMore}
              onEndReachedThreshold={0.8}
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
              //무한스크롤
              // onEndReached={ threshold에도달 시 실행할함수}
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
