import React, {useState} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DoneModal from '../../modal/DoneModal';
import {useNavigation} from '@react-navigation/native';
import {IMissionCardProps, IMissionCardContentProps, IMissionsProgress} from '../../data';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  getMissionsProgress,
  patchMissionCancel,
  patchMissionSuccess,
  patchMissionSuccessRequest,
} from '../../api/mission';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import {queryKey} from '../../api/queryKey';

export const MissionCard: FC<IMissionCardProps> = ({
  mission,
  missionId,
  point,
  storeCategory,
  storeName,
  missionStatus,
  onPressRequestBtn,
}) => {
  const DataMissionsProgress = useQuery<IMissionsProgress[]>(
    queryKey.MISSIONSPROGRESS,
    getMissionsProgress,
  );
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const missionCancelMutation = useMutation(() => patchMissionCancel(missionId as number), {
    onSuccess: (data) => {
      console.log('미션 취소 성공: ', data);
      queryClient.invalidateQueries('missionsProgress');
    },
    onError: (err) => {
      console.log('미션 취소 실패: ', err);
    },
  });
  const missionSuccessRequestMutation = useMutation(
    () => patchMissionSuccessRequest(missionId as number),
    {
      onMutate: async (id: number) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(queryKey.MISSIONSPROGRESS);

        // Snapshot the previous value
        const previousData = queryClient.getQueryData<IMissionsProgress[]>(
          queryKey.MISSIONSPROGRESS,
        );

        if (previousData) {
          // Optimistically update to the new value
          queryClient.setQueryData(queryKey.MISSIONSPROGRESS, [
            {...previousData[0], missionStatus: 'CHECKING'},
          ]);
        }

        // Return a context with the previous and new todo
        return {previousData, id};
      },
      // If the mutation fails, use the context we returned above
      onError: (err, newTodo, context) => {
        console.log(err);
        queryClient.setQueryData(queryKey.MISSIONSPROGRESS, context?.previousData);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(queryKey.MISSIONSPROGRESS);
      },
    },
  );
  const missionSuccessMutation = useMutation(() => patchMissionSuccess(missionId as number), {
    onSuccess: (data) => {
      console.log('미션성공: ', data);
      queryClient.invalidateQueries('missionsProgress');
      queryClient.prefetchQuery('missionsProgress');
      queryClient.invalidateQueries('missionsComplete');
      queryClient.invalidateQueries('userInfo');
      queryClient.invalidateQueries('homeData');
    },
    onError: (err) => {
      console.log('미션 성공요청 실패: ', err);
    },
  });
  //[성공요청] 버튼 누를 시 사장님께 전송
  const handleRequestPress = () => {
    console.log(missionId, '번 가게 성공요청됨');
    onPressRequestBtn(); //화면글자 바꾸는 status 변경 NEW->PROGRESS
    missionSuccessRequestMutation.mutate();
  };
  //[성공] 버튼 누를 시 포인트적립 모달 열기
  async function handleSuccessPress() {
    console.log(missionId, '번 가게 성공');
    missionSuccessMutation.mutate();
    navigation.navigate('MissionSuccess');
  }

  const MissionCardTwoButton: FC<IMissionCardContentProps> = ({
    handleOnPress,
    text,
    cancelBgColor,
    cancelTextColor,
    bgColor,
  }) => {
    return (
      <>
        <View style={[styles.missionTwoButton]}>
          <TouchableOpacity
            disabled={text === '성공' ? true : false}
            onPress={() => {
              missionCancelMutation.mutate();
              navigation.navigate('Main');
            }}
            style={[styles.missionButtonLeft, {backgroundColor: `${cancelBgColor}`}]}
          >
            <View>
              <Text style={[DesignSystem.body1Lt, {color: `${cancelTextColor}`}]}>취소</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={text === '성공 요청중..' ? true : false}
            style={[styles.missionButtonRight, {backgroundColor: `${bgColor}`}]}
            onPress={handleOnPress}
          >
            <View>
              <Text style={[DesignSystem.title4Md, {color: 'white'}]}>{`${text}`}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={[styles.missionCardWrap]}>
      <View style={[styles.missionCard]}>
        <View style={[styles.missionMain]}>
          <View style={[styles.nameBox]}>
            <Text style={[DesignSystem.title4Md, styles.nameText]}>{storeName}</Text>
            <Text style={[DesignSystem.body2Lt, styles.categoryText]}>{storeCategory}</Text>
          </View>
          <View style={{marginBottom: 20, flexDirection: 'row'}}>
            <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>{mission}</Text>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}> 결제시 </Text>
            <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>{point}P 적립</Text>
          </View>
        </View>
        {missionStatus === 'PROGRESS' ? (
          <MissionCardTwoButton
            missionId={missionId}
            handleOnPress={handleRequestPress}
            text="성공요청"
            bgColor="#555555"
            cancelBgColor="#EFEFEF"
            cancelTextColor="#111111"
          />
        ) : missionStatus === 'CHECKING' ? (
          <MissionCardTwoButton
            missionId={missionId}
            text="성공 요청중.."
            bgColor="#C8C8C8"
            cancelBgColor="#EFEFEF"
            cancelTextColor="#111111"
          />
        ) : (
          // missionStatus === 'CHECKED'
          <MissionCardTwoButton
            handleOnPress={handleSuccessPress}
            text="성공"
            bgColor="#6C69FF"
            cancelBgColor="#DFDFDF"
            cancelTextColor="#949494"
          />
        )}
      </View>
      {missionStatus === 'PROGRESS' && (
        <View style={{width: '100%', flexDirection: 'row-reverse'}}>
          <View style={[DesignSystem.centerArrange, {top: -7, width: '50%'}]}>
            <Icon name="triangle" size={12} style={[styles.headerIconStyle]} />
            <View style={[styles.NEWBallon, DesignSystem.centerArrange]}>
              <Text style={[styles.ballonTextOne]}>미션 완료 후 클릭!</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  missionCardWrap: {
    marginLeft: 16,
    marginRight: 16,
  },
  missionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
  },
  missionMain: {
    flex: 1,
    paddingHorizontal: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: '#E8E8E8',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  nameBox: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 0.5,
    marginTop: 24,
    marginBottom: 16,
  },
  nameText: {
    color: '#111111',
    marginBottom: 4,
  },
  categoryText: {
    color: '#616161',
    marginBottom: 16,
  },
  costText: {
    fontFamily: 'Pretendard-medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#111111',
  },
  pointText: {
    fontFamily: 'Pretendard-medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#6C69FF',
  },
  missionTwoButton: {
    flexDirection: 'row',
    height: 48,
  },
  missionButtonLeft: {
    width: '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
    borderBottomLeftRadius: 15,
  },
  missionButtonRight: {
    width: '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderBottomRightRadius: 15,
  },
  missionButtonView: {
    borderWidth: 2,
  },
  NEWBallon: {
    //말풍선
    backgroundColor: '#6C69FF',
    top: -3,
    borderRadius: 6,
    paddingHorizontal: 13,
    paddingVertical: 10,

    shadowColor: '#000C8A',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 4,
  },
  headerIconStyle: {
    color: '#6C69FF',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ballonTextOne: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    lineHeight: 22,
    color: '#FFFFFF',
  },
});
