import React from 'react';
//prettier-ignore
import {View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Platform} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeStackParamList} from '../../nav/HomeNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {MapWebview} from '../../modal';
import {IHomeMissionDetail} from '../../data';
import {DesignSystem} from '../../assets/DesignSystem';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getHomeMissionDetail, patchHomeMissionChallenge} from '../../api/home';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMissionDetails'>;

export const HomeMissionDetails = ({navigation, route}: Props) => {
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const goBack = () => {
    navigation.goBack();
  };
  const missionData = useQuery<IHomeMissionDetail>(
    queryKey.HOMEMISSION,
    () => getHomeMissionDetail(route.params.missionId),
    {
      onSuccess(data) {
        console.log('홈 미션 디테일 데이터 받기 성공: ', data);
      },
      onError(err) {
        console.log('홈 미션 디테일 데이터 받기 실패: ', err);
      },
    },
  );
  const missionMutation = useMutation((missionId: number) => patchHomeMissionChallenge(missionId), {
    onSuccess: (data) => {
      console.log('미션 도전 성공: ', data);
      return queryClient.invalidateQueries('missionsProgress');
    },
    onError: (err) => {
      console.log('미션 도전 실패: ', err);
    },
  });

  return (
    <SafeAreaView style={[styles.flex]}>
      <MyHeader goBack={goBack} title={'미션 정보'} />
      <MapWebview missionId={missionData.data?.missionId} userId={0} />

      <View style={[styles.missionCard, {bottom: Platform.OS === 'ios' ? insets.bottom : 0}]}>
        <View style={[styles.missionMain]}>
          <TouchableOpacity style={[styles.nameBox]}>
            <Text style={[DesignSystem.title4Md, DesignSystem.grey17, {marginBottom: 4}]}>
              {missionData.data?.name}
            </Text>
            <Text style={[DesignSystem.body2Lt, DesignSystem.grey10, {marginBottom: 16}]}>
              {missionData.data?.category}
            </Text>
          </TouchableOpacity>
          <View style={[DesignSystem.centerArrange, styles.missionContentBox]}>
            {missionData.data?.images !== null && (
              <View style={{marginBottom: 16, flexDirection: 'row'}}>
                {missionData.data?.images.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      source={{uri: item.imageUrl}}
                      style={{width: 60, height: 60, marginRight: 8}}
                    />
                  );
                })}
              </View>
            )}
            <Text>
              <Text style={[DesignSystem.title4Md]}>{missionData.data?.mission}</Text>
              <Text style={[DesignSystem.body1Lt]}>의 식사시 </Text>
              <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>
                {missionData.data?.point}P 적립
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              missionMutation.mutate(route.params.missionId);
              navigation.pop();
              navigation.navigate('Mission'); //미션Id연결
            }}
            style={[styles.missionButton]}
          >
            <View style={[DesignSystem.centerArrange]}>
              <Text style={[DesignSystem.title4Md, DesignSystem.grey1]}>도전!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  missionCard: {
    position: 'absolute',
    bottom: 32,
    backgroundColor: '#FFFFFF',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    paddingBottom: 16,
    alignItems: 'center', //
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: '#E8E8E8',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: '100%',
  },
  nameBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
  },
  missionMain: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  missionContentBox: {
    marginBottom: 20,
    marginTop: 20,
  },
  missionButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#6C69FF',
    borderRadius: 10,
  },
});
