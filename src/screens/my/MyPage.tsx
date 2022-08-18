import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyUser} from '../../components/My/MyUser';
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {DesignSystem} from '../../assets/DesignSystem';
import {calHeight} from '../../assets/CalculateLength';
import {useQuery} from 'react-query';
import {IgetUsersMe} from '../../data';
import {queryKey} from '../../api/queryKey';
import {getUserInfo} from '../../api';
import {ConnectionError} from '../../components/ConnectionError';
import QuitModal from '../../modal/QuitModal';
import LogoutModal from '../../modal/LogoutModal';
import {useFocusEffect} from '@react-navigation/native';

const MyPage = () => {
  const navigation = useNavigation();
  const [quitModal, setQuitModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const {data, isError, refetch, isLoading} = useQuery<IgetUsersMe>(queryKey.USERINFO, getUserInfo);
  console.log('getUserInfo', data);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  // data.point 로 접근

  if (isError) {
    return <ConnectionError refetch={refetch} />;
  }

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F8F8F8'}]}>
        <View style={[styles.headerWrap]}>
          <View style={[styles.header]}>
            <Text style={[styles.headerText, DesignSystem.h2SB]}>마이페이지</Text>
          </View>
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          data !== undefined && (
            <MyUser
              authentication={data.authentication}
              email={data.email}
              name={data.name}
              point={data.point}
            />
          )
        )}
        <TouchableOpacity onPress={() => navigation.navigate('MyReview')}>
          <View style={[styles.myMenuWrap]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>리뷰 관리</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyNotificationsSetting')}>
          <View style={[styles.myMenuWrap]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>알림 설정</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyInquiry')}>
          <View style={[styles.myMenuWrap]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>1:1 문의</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://forms.gle/R2vrJzXA8xYgnhVw8')}>
          <View style={[styles.myMenuWrap]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>의견 남기기</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLogoutModal(true)}>
          <View style={[styles.myMenuWrap]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>로그아웃</Text>
          </View>
        </TouchableOpacity>
        <View style={{alignItems: 'flex-end', marginTop: 14, marginRight: 16}}>
          <TouchableOpacity onPress={() => setQuitModal(true)}>
            <Text style={[DesignSystem.body2Lt, DesignSystem.grey9]}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
        <QuitModal visible={quitModal} closeQuitModal={() => setQuitModal(false)} />
        <LogoutModal visible={logoutModal} closeLogoutModal={() => setLogoutModal(false)} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  headerWrap: {
    width: '100%',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
  },
  header: {
    height: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  headerText: {
    color: 'black',
    marginLeft: 16,
    marginRight: 16,
  },
  myMenuWrap: {
    paddingLeft: 22,
    width: '100%',
    height: Platform.OS === 'ios' ? hp(calHeight(68, true)) : hp(calHeight(68)),
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
    justifyContent: 'center',
  },
  quitText: {
    color: '#777777',
    fontSize: 14,
    marginRight: 16,
    marginTop: 8,
  },
});

export default MyPage;
