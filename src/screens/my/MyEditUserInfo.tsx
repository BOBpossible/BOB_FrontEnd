import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {DesignSystem} from '../../assets/DesignSystem';
import {IgetUsersMe} from '../../data';
import {useQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getUserCategory, getUserInfo} from '../../api';
import {getCategoryList} from '../../api';

type Props = NativeStackScreenProps<MyStackParamList, 'MyEditUserInfo'>;

export const MyEditUserInfo = ({navigation}: Props) => {
  const userInfo = useQuery<IgetUsersMe>(queryKey.USERINFO, getUserInfo);
  const categoryList = useQuery('categoryList', getCategoryList);
  const userCateogyList = useQuery('userCategoryList', getUserCategory);
  const goBack = () => {
    navigation.goBack();
  };
  function editProfileImg() {
    console.log('수정');
  }

  console.log(userCateogyList.data);
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F8F8F8'}]}>
        <MyHeader goBack={goBack} title={'회원정보 수정'} />
        <View style={[styles.userInfoProfile]}>
          <TouchableOpacity onPress={editProfileImg} style={[styles.profileWrap]}>
            <Image
              style={[styles.profileImg]}
              source={require('../../assets/images/bobProfile.png')} //
            />
          </TouchableOpacity>
          <View style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>{userInfo.data?.name}</Text>
            <TouchableOpacity style={{}}>
              <View style={[styles.editButton]}>
                <Text style={[DesignSystem.caption1Lt, DesignSystem.grey10]}>수정</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.userInfoEdit]}>
          <View style={[styles.userInfoEditContent]}>
            <View style={[styles.emailNinput]}>
              <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 8}]}>이메일</Text>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey8]}>{userInfo.data?.email}</Text>
            </View>
            <View>
              <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 8}]}>
                전화번호
              </Text>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey8]}>
                010 - **** - {userInfo.data?.phone}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.userInfoEdit, {marginTop: 8}]}>
          <View style={[styles.userInfoEditContent]}>
            <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 8}]}>
              선호하는 음식
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
            >
              <View style={{flexDirection: 'row'}}>
                {userCateogyList.data &&
                  userCateogyList.data?.map((item: any, i: number) => {
                    return (
                      <Text style={[DesignSystem.body1Lt, DesignSystem.grey8]}>
                        {item.name}
                        {userCateogyList.data.length - 1 !== i ? ', ' : ''}
                      </Text>
                    );
                  })}
              </View>
              <TouchableOpacity style={{}}>
                <View style={[styles.editButton]}>
                  <Text style={[DesignSystem.caption1Lt, DesignSystem.grey10]}>수정</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => console.log('탈퇴')} style={{alignItems: 'flex-end'}}>
          <Text style={[styles.quitText]}>계정탈퇴</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  userInfoProfile: {
    height: 120,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  profileWrap: {marginBottom: 8},
  profileImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#6C69FF',
  },
  editPen: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    left: 53,
    top: 45,
  },
  userInfoEdit: {
    backgroundColor: '#FFFFFF',
  },
  userInfoEditContent: {
    marginTop: 12,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  emailNinput: {
    marginBottom: 20,
  },
  inputText: {
    width: '100%',
    height: 44,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#111111',
  },
  focusBorder: {borderColor: '#6C69FF', borderWidth: 1},
  unfocusBorder: {borderColor: '#DFDFDF', borderWidth: 1},
  quitText: {
    color: '#777777',
    fontSize: 14,
    marginRight: 16,
    marginTop: 8,
  },
  editButton: {
    height: 20,
    width: 37,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#EFEFEF',
    marginLeft: 8,
  },
});
