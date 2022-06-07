import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegisterHeader, RegisterNextButton} from '../components';
import {CategoryItem} from '../components/CategoryItem';
import {RegisterInterface} from '../data';
import {AuthStackParamList} from '../nav';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterForm'>;

const RegisterCategory = ({navigation, route}: Props) => {
  const [registerData, setRegisterData] = useState<RegisterInterface>(route.params.registerData);
  const [category, setCategory] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
  });
  const goNext = () => {
    navigation.reset({routes: [{name: 'MainNavigator'}]});
  };
  const goBack = () => {
    navigation.navigate('RegisterForm', {registerData});
  };
  const getCategoryArray = () => {
    return Object.keys(category).filter((key) => category[key as unknown as keyof typeof category]);
  };

  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={goBack} pageNum={2} />
      <View style={[styles.flex]}>
        <View style={[styles.categoryWrap]}>
          <View style={[styles.categoryHead]}>
            <Text style={[styles.categoryHeadText]}>선호하는 음식 종류를 선택해주세요!</Text>
            <Text style={[styles.categorySubHeadText]}>중복선택 가능해요!</Text>
          </View>
          <View style={[styles.categoryBox]}>
            <View style={[styles.categoryRow]}>
              <CategoryItem
                onPress={() => {
                  setCategory({...category, 0: !category[0]});
                  setRegisterData({...registerData, category: category});
                }}
                title="한식"
                isSelected={category[0]}
              />
              <CategoryItem
                onPress={() => {
                  setCategory({...category, 1: !category[1]});
                  setRegisterData({...registerData, category: category});
                }}
                title="일식"
                isSelected={category[1]}
              />
              <CategoryItem
                onPress={() => {
                  setCategory({...category, 2: !category[2]});
                  setRegisterData({...registerData, category: category});
                }}
                title="중식"
                isSelected={category[2]}
              />
            </View>
            <View style={[styles.categoryRow]}>
              <CategoryItem
                onPress={() => {
                  setCategory({...category, 3: !category[3]});
                  setRegisterData({...registerData, category: category});
                }}
                title="양식"
                isSelected={category[3]}
              />
              <CategoryItem
                onPress={() => {
                  setCategory({...category, 4: !category[4]});
                  setRegisterData({...registerData, category: category});
                }}
                title="치킨"
                isSelected={category[4]}
              />
              <CategoryItem
                onPress={() => {
                  setCategory({...category, 5: !category[5]});
                  setRegisterData({...registerData, category: category});
                }}
                title="분식"
                isSelected={category[5]}
              />
            </View>
            <View style={[styles.categoryRow]}>
              <CategoryItem
                onPress={() => {
                  setCategory({...category, 6: !category[6]});
                  setRegisterData({...registerData, category: category});
                }}
                title="고기/구이"
                isSelected={category[6]}
              />
              <CategoryItem
                onPress={() => {
                  setCategory({...category, 7: !category[7]});
                  setRegisterData({...registerData, category: category});
                }}
                title="도시락"
                isSelected={category[7]}
              />
              <CategoryItem
                onPress={() => {
                  setCategory({...category, 8: !category[8]});
                  setRegisterData({...registerData, category: category});
                }}
                title="야식"
                isSelected={category[8]}
              />
            </View>
            <View style={[styles.categoryRow]}>
              <CategoryItem
                onPress={() => {
                  setCategory({...category, 9: !category[9]});
                  setRegisterData({...registerData, category: category});
                }}
                title="패스트 푸드"
                isSelected={category[9]}
              />
              <CategoryItem
                onPress={() => {
                  setCategory({...category, 10: !category[10]});
                  setRegisterData({...registerData, category: category});
                }}
                title="디저트"
                isSelected={category[10]}
              />
              <CategoryItem
                onPress={() => {
                  setCategory({...category, 11: !category[11]});
                  setRegisterData({...registerData, category: category});
                }}
                title="아시안푸드"
                isSelected={category[11]}
              />
            </View>
          </View>
        </View>
      </View>
      <RegisterNextButton goNext={goNext} buttonState={2} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  backButton: {
    position: 'absolute',
    width: 24,
    height: 24,
    left: 12,
    top: 44,
  },
  categoryWrap: {
    margin: 16,
  },
  categoryHead: {
    width: 205,
    marginBottom: 56,
  },
  categoryHeadText: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 34,
  },
  categorySubHeadText: {
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 22,
    marginTop: 8,
    color: '#616161',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default RegisterCategory;
