import React, {useState} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {DesignSystem} from '../assets/DesignSystem';
import {MissionCard} from '../components';
import {MissionProcess} from '../components/Mission/MissionProcess';
import {MissionProgressSwitch} from '../components/Mission/MissionProgressSwitch';
import {MissionSuccessList} from '../components/Mission/MissionSuccessList';
import {MissionUser} from '../components/Mission/MissionUser';
import {MissionNo} from '../components/Mission/MissionNo';
import {useQuery} from 'react-query';
import {queryKey} from '../api/queryKey';
import {getMissionsProgress} from '../api/mission';
import {IMissionsProgress, IgetUsersMe} from '../data';
import {getUserInfo} from '../api/user';

///"NEW","PROGRESS" :'진행중' processCircle  // "OWNER_CHECK" : '도전 성공' processCircle

const Mission = () => {
  const [status, setStatus] = useState<string>('OWNER_CHECK'); //버튼문구 //"NEW","PROGRESS","OWNER_CHECK" //서버연결후삭제
  //status 이건 여기서 서버로부터 받아와서 아래 컴포넌트에 넘겨줘야할듯. 사장님이 승인했는지 어쩐지
  const [progressnow, setProgressnow] = useState(0); //아래 스위치. 0:진행중 / 1:진행완료
  const DataMissionsProgress = useQuery<IMissionsProgress>(
    queryKey.MISSIONSPROGRESS,
    getMissionsProgress,
  );
  // console.log('지금미션', DataMissionsProgress.data); //스웨거에서 result
  const DataUser = useQuery<IgetUsersMe>('userInfo', getUserInfo);
  // console.log('여기서유저', DataUser); //DataUser.data.~
  const onPressRequestBtn = () => {//status바뀌는거 감지하면 이거 필요없을듯 . .. . ?
    setStatus('PROGRESS');
    console.log('성공요청전송: NEW->PROGRESS');
  };

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F6F6FA'}]}>
        <View style={[styles.headerWrap]}>
          <View style={[styles.header]}>
            <Text style={[DesignSystem.h2SB, {color: 'black'}]}>미션</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          {progressnow === 0 ? (
            DataMissionsProgress.data === undefined ? (
              <MissionNo progressnow={progressnow} /> ///미션없는화면
            ) : (
              <View>
                <MissionProcess status={status} />
                <MissionUser username={DataUser.data?.name} userid={DataUser.data?.userId} />
                <MissionCard
                  // mission={'10000원 이상'}
                  // missionId={1}
                  // missionStatus={status}
                  // point={500}
                  // storeCategory={'중국집'}
                  // storeName={'짱맛집'}
                  mission={DataMissionsProgress.data?.mission}
                  missionId={DataMissionsProgress.data?.missionId}
                  missionStatus={status}
                  point={DataMissionsProgress.data?.point}
                  storeCategory={DataMissionsProgress.data?.storeCategory}
                  storeName={DataMissionsProgress.data?.storeName}
                  onPressRequestBtn={onPressRequestBtn}
                />
              </View>
            )
          ) : DataMissionsProgress.data === undefined ? (
            <MissionNo progressnow={progressnow} /> ///미션없는화면
          ) : (
            <MissionSuccessList />
          )}
        </View>
        <MissionProgressSwitch progressnow={progressnow} setProgressnow={setProgressnow} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  headerWrap: {
    width: '100%',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#FFFFFF',
    marginLeft: 16,
  },
});

export default Mission;
