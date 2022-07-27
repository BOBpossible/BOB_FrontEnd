import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterHeader, RegisterNextButton} from '../../components';
import {CategoryItem} from '../../components/CategoryItem';
import {RegisterInterface} from '../../data';
import {AuthStackParamList} from '../../nav';
import {customAxios} from '../../api';
import {DesignSystem} from '../../assets/DesignSystem';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterForm'>;

type categoryList = {id: number; name: string}[];

const RegisterCategory = ({navigation, route}: Props) => {
  const [registerData, setRegisterData] = useState<RegisterInterface>(route.params.registerData);
  const [categoryList, setCategoryList] = useState<categoryList>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  //axios 통신 처리들
  const postRegister = async () => {
    try {
      const response = await customAxios().post('/api/v1/users', registerData);
      console.log('post register:', response.data);
    } catch (error) {
      console.log('post register:', error);
    }
  };
  const postCategories = async () => {
    const categoriesParams = {favorites: selectedCategories.join(',')};
    try {
      const response = await customAxios().post('/api/v1/member-categories', null, {
        params: categoriesParams,
      });
      console.log('category register:', response.data);
    } catch (error) {
      console.log('category register:', error);
    }
  };
  const getCategories = async () => {
    try {
      const response = await customAxios().get('/api/v1/categories', {});
      setCategoryList(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRegisterData(route.params.registerData);
    getCategories();
  }, []);

  const goNext = async () => {
    await postRegister();
    await postCategories();
    navigation.reset({
      index: 0,
      routes: [{name: 'RegisterDone'}],
    });
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
    return categoryList.map((item, idx) => {
      return (
        <CategoryItem
          key={idx}
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
            <Text style={[DesignSystem.h1SB, DesignSystem.grey17]}>선호하는 음식 종류를</Text>
            <Text style={[DesignSystem.h1SB, DesignSystem.grey17]}>선택해주세요!</Text>
            <Text style={[DesignSystem.body2Lt, DesignSystem.grey10, {marginTop: 8}]}>
              중복선택 가능해요!
            </Text>
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
    width: 210,
    marginBottom: 56,
    flexDirection: 'column',
  },
  categoryBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default RegisterCategory;
