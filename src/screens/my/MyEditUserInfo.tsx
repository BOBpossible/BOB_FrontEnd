import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {DesignSystem} from '../../assets/DesignSystem';
import {IgetUsersMe} from '../../data';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getUserCategory, getUserInfo, postAddCategory, patchDeleteCategory} from '../../api';
import {getCategoryList} from '../../api';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import {CategoryItem} from '../../components/CategoryItem';
import EditNameModal from '../../modal/EditNameModal';

type Props = NativeStackScreenProps<MyStackParamList, 'MyEditUserInfo'>;

export const MyEditUserInfo = ({navigation}: Props) => {
  const queryClient = useQueryClient();
  const [editNameModal, setEditNameModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [initialCategories, setInitialCategories] = useState<number[]>([]);
  const userInfo = useQuery<IgetUsersMe>(queryKey.USERINFO, getUserInfo);
  const categoryList = useQuery('categoryList', getCategoryList);
  const userCategoryList = useQuery('userCategoryList', getUserCategory, {
    onSuccess: (data) => {
      console.log('서버에서 가져온 데이터', data);
      const reformatData = data.map((item) => item.id);
      setSelectedCategories(reformatData);
      setInitialCategories(reformatData);
    },
  });

  /**
   * 카테고리 추가 api를 실행 시킨다.
   */
  const addCategoryMutation = useMutation((data: number[]) => postAddCategory(data), {
    onSuccess(data) {
      console.log('유저 카테고리 추가 성공: ', data);
      queryClient.setQueryData('userCategoryList', data);
      // queryClient.invalidateQueries('userCategoryList');
    },
  });

  /**
   * 카테고리 삭제 api를 실행 시킨다.
   */
  const deleteCategoryMutation = useMutation((data: number) => patchDeleteCategory(data), {
    onSuccess(data) {
      console.log('유저 카테고리 삭제 성공: ', data);
      // queryClient.invalidateQueries('userCategoryList');
    },
  });

  console.log('업데이트 카테고리: ', selectedCategories);
  console.log('원래 카테고리: ', initialCategories);
  const height = Dimensions.get('screen').height;
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const listSnapPoint =
    Platform.OS === 'ios' ? hp(calHeight(height - 120, true)) : hp(calHeight(height - 120));
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} pressBehavior={0} disappearsOnIndex={0} appearsOnIndex={1} />
    ),
    [],
  );

  const goBack = () => {
    navigation.goBack();
  };

  /**
   * 카테고리 수정 창을 닫을때 바뀐 카테고리를 업데이트한다
   * @param {number[]} initCategory 업데이트 하기전 카테고리
   * @param {number[]} updatedCategory 업데이트 하고난 후 카테고리
   */
  const onSaveCategory = (initCategory: number[], updatedCategory: number[]) => {
    //추가
    const addedCategories = updatedCategory.filter((item) => !initCategory.includes(item));
    console.log('카테고리 추가: ', addedCategories);
    if (addedCategories !== []) {
      addCategoryMutation.mutate(addedCategories);
    }

    //삭제
    const deletedCategories = initCategory.filter((item) => !updatedCategory.includes(item));
    console.log('카테고리 삭제: ', deletedCategories);
    if (deletedCategories !== []) {
      deleteCategoryMutation.mutate(deletedCategories[0]);
    }

    // setInitialCategories(selectedCategories);
  };

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F8F8F8'}]}>
        <MyHeader goBack={goBack} title={'회원정보 수정'} />
        <View style={[styles.userInfoProfile]}>
          <Image
            style={[styles.profileImg]}
            source={require('../../assets/images/bobProfile.png')}
          />
          <View style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>{userInfo.data?.name}</Text>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setEditNameModal(true);
              }}
            >
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 8}]}>
                선호하는 음식
              </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  if (bottomSheetRef.current !== null) {
                    bottomSheetRef.current.expand();
                  }
                }}
              >
                <View style={[styles.editButton]}>
                  <Text style={[DesignSystem.caption1Lt, DesignSystem.grey10]}>수정</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
              {userCategoryList.data &&
                userCategoryList.data?.map((item: any, i: number) => {
                  return (
                    <Text style={[DesignSystem.body1Lt, DesignSystem.grey8]} key={i}>
                      {item.name}
                      {userCategoryList.data.length - 1 !== i ? ', ' : ''}
                    </Text>
                  );
                })}
            </View>
          </View>
        </View>
        <EditNameModal visible={editNameModal} close={() => setEditNameModal(false)} />
      </SafeAreaView>

      {/* {바텀 시트 코드} */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, listSnapPoint]}
        handleIndicatorStyle={{width: 68, backgroundColor: '#C4C4C4'}}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={{marginLeft: 16, marginBottom: 8, marginRight: 16}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
          >
            <Text style={[DesignSystem.subtitle2, DesignSystem.grey17]}>선호하는 음식 종류</Text>
            <TouchableOpacity
              onPress={() => {
                onSaveCategory(initialCategories, selectedCategories);
                if (bottomSheetRef.current !== null) {
                  bottomSheetRef.current.close();
                }
              }}
            >
              <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>저장</Text>
            </TouchableOpacity>
          </View>

          <Text style={[DesignSystem.body2Lt, DesignSystem.grey10]}>중복 선택 가능해요!</Text>
        </BottomSheetView>

        <BottomSheetFlatList
          data={categoryList.data}
          columnWrapperStyle={{justifyContent: 'space-between', marginLeft: 16, marginRight: 16}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <CategoryItem
              key={index}
              onPress={() => {
                if (selectedCategories.includes(item.id)) {
                  setSelectedCategories((current) =>
                    current.filter((category) => {
                      return category !== item.id;
                    }),
                  );
                } else {
                  setSelectedCategories([...selectedCategories, item.id]);
                }
              }}
              title={item.name}
              isSelected={selectedCategories.includes(item.id)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{marginTop: 16}} />}
          numColumns={3}
        />
      </BottomSheet>
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
