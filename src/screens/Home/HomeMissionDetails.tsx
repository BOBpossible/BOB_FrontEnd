import React, {useState} from 'react';
//prettier-ignore
import {View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Platform} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeStackParamList} from '../../nav/HomeNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {MapWebview, PhotoModal} from '../../modal';
import {IHomeMissionDetail} from '../../data';
import {DesignSystem} from '../../assets/DesignSystem';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getHomeMissionDetail, patchHomeMissionChallenge} from '../../api/home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StoreModal from '../../modal/StoreModal';
import {missionPage} from '../../state';
import {useSetRecoilState} from 'recoil';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMissionDetails'>;

export const HomeMissionDetails = ({navigation, route}: Props) => {
  const setProgress = useSetRecoilState(missionPage);
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const [storeModal, setStoreModal] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  const [reviewPhoto, setReviewPhoto] = useState<{uri: string}>({uri: 'string'});

  const openPhotoModal = (imageSource: string) => {
    setReviewPhoto({uri: imageSource});
    setPhotoModal(true);
  };

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
      {/* 맵뷰 */}
      <MapWebview missionId={missionData.data?.missionId} userId={0} type={1} />
      <View style={[styles.missionCard, {bottom: Platform.OS === 'ios' ? insets.bottom : 0}]}>
        <View style={[styles.missionMain]}>
          <TouchableOpacity style={[styles.nameBox]} onPress={() => setStoreModal(true)}>
            <View style={{flexDirection: 'row', marginBottom: 4, alignItems: 'center'}}>
              <Icon
                name="chevron-right"
                size={18}
                color="#111111"
                style={{marginLeft: 4, opacity: 0}}
              />
              <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>
                {missionData.data?.name}
              </Text>
              <Icon name="chevron-right" size={18} color="#111111" style={{marginLeft: 4}} />
            </View>
            <Text style={[DesignSystem.body2Lt, DesignSystem.grey10, {marginBottom: 16}]}>
              {missionData.data?.category}
            </Text>
          </TouchableOpacity>
          <View style={[DesignSystem.centerArrange, styles.missionContentBox]}>
            {missionData.data?.images !== null && (
              <View style={{marginBottom: 16, flexDirection: 'row'}}>
                {missionData.data?.images.map((item, index) => {
                  return (
                    <TouchableOpacity onPress={() => openPhotoModal(item.imageUrl)} key={index}>
                      <Image
                        source={{uri: item.imageUrl}}
                        style={{width: 60, height: 60, marginRight: 4, marginLeft: 4}}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
            <Text>
              <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>
                {missionData.data?.mission}
              </Text>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}> 결제시 </Text>
              <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>
                {missionData.data?.point}P 적립
              </Text>
            </Text>
            <PhotoModal
              imageUri={reviewPhoto}
              visible={photoModal}
              closePhotoModal={() => setPhotoModal(false)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              missionMutation.mutate(route.params.missionId);
              setProgress(true);
              navigation.pop();
              navigation.navigate('MissionNavigator'); //미션 시작후 미션 화면으로 보냄
            }}
            style={[styles.missionButton]}
          >
            <View style={[DesignSystem.centerArrange]}>
              <Text style={[DesignSystem.title2Regular, {color: 'white'}]}>도전!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {missionData.data !== undefined && (
        <StoreModal
          visible={storeModal}
          storeId={missionData.data?.storeId}
          closeStoreModal={() => setStoreModal(false)}
        />
      )}
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
    paddingTop: 30,
    paddingBottom: 20,
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
    paddingVertical: 10,
    backgroundColor: '#6C69FF',
    borderRadius: 10,
  },
});
