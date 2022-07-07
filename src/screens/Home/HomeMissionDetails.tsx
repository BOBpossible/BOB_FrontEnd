import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeStackParamList} from '../../nav/HomeNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {MapWebview} from '../../modal';
import {createMission, MissionInterface} from '../../data';
import {DesignSystem} from '../../assets/DesignSystem';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMissionDetails'>;

const dummyMission: MissionInterface = {
  storeName: '반이학생마라탕',
  storeCategory: '중식당',
  point: 500,
  missionContent: '10000원 이상',
  menuImage: null,
};

export const HomeMissionDetails = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();
  const [missionInfo, setMissionInfo] = useState<MissionInterface>(createMission);
  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    //get 미션하고 setMissionInfo
    setMissionInfo(dummyMission);
  }, []);
  return (
    <SafeAreaView style={[styles.flex]}>
      <MyHeader goBack={goBack} title={'미션 정보'} />
      <MapWebview />
      <View style={[styles.missionCard, {bottom: Platform.OS === 'ios' ? insets.bottom : 0}]}>
        <View style={[styles.missionMain]}>
          <TouchableOpacity style={[styles.nameBox]}>
            <Text style={[DesignSystem.title4Md, DesignSystem.grey17, {marginBottom: 4}]}>
              {dummyMission.storeName}
            </Text>
            <Text style={[DesignSystem.body2Lt, DesignSystem.grey10, {marginBottom: 16}]}>
              {dummyMission.storeCategory}
            </Text>
          </TouchableOpacity>
          <View style={[DesignSystem.centerArrange, styles.missionContentBox]}>
            {dummyMission.menuImage !== null && (
              <View style={{marginTop: 16}}>
                {dummyMission.menuImage.map((item, index) => {
                  return <Image key={index} source={item} style={{width: 60, height: 60}} />;
                })}
              </View>
            )}
            <Text>
              <Text style={[DesignSystem.title4Md]}>{dummyMission.missionContent}</Text>
              <Text style={[DesignSystem.body1Lt]}>의 식사시 </Text>
              <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>
                {dummyMission.point}P 적립
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
              navigation.navigate('Mission', {missionId: 1});
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
