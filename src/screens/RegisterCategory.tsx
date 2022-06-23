import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterHeader, RegisterNextButton} from '../components';
import {CategoryItem} from '../components/CategoryItem';
import {RegisterInterface} from '../data';
import {AuthStackParamList} from '../nav';
import {useRecoilValue} from 'recoil';
import {userToken} from '../state';
import axios from 'axios';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterForm'>;

type categoryList = {id: number; name: string}[];

const RegisterCategory = ({navigation, route}: Props) => {
  const [registerData, setRegisterData] = useState<RegisterInterface>(route.params.registerData);
  const [categoryList, setCategoryList] = useState<categoryList>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const token = useRecoilValue(userToken);
  const headers = {Authorization: `Bearer ${token}`};
  const postRegister = async () => {
    try {
      const response = await axios.post('https://bobpossible.shop/api/v1/users', registerData, {
        headers: headers,
      });
      console.log(response);
    } catch (error) {
      console.log('post register:', error);
    }
  };
  const postCategories = async () => {
    try {
      const response = await axios.post(
        'https://bobpossible.shop/api/v1/member-categories',
        selectedCategories,
        {
          headers: headers,
        },
      );
      console.log(response);
    } catch (error) {
      console.log('category register:', error);
    }
  };
  useEffect(() => {
    setRegisterData(route.params.registerData);
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      const response = await axios.get('https://bobpossible.shop/api/v1/categories', {
        headers: headers,
      });
      setCategoryList(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const goNext = () => {
    postRegister();
    postCategories();
    navigation.reset({routes: [{name: 'MainNavigator'}]});
  };
  const goBack = () => {
    navigation.navigate('RegisterForm', {registerData});
  };

  // const postRegister = async () => {
  //   try {
  //     const response = await axios.post('https://bobpossible.shop/api/v1/user', registerData, {
  //       headers: headers,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const renderedCategories = () => {
    return categoryList.map((item) => {
      return (
        <CategoryItem
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
      );
    });
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
          <View style={[styles.categoryBox]}>{renderedCategories()}</View>
        </View>
      </View>
      <RegisterNextButton goNext={goNext} buttonState={2} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
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
  categoryBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default RegisterCategory;
