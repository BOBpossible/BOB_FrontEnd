import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {queryKey} from '../api/queryKey';
import {getCategories, getSuggestion} from '../api';
import {DesignSystem} from '../assets/DesignSystem';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import {history} from '../state';

export const MapSearch = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [rcHistory, setRCHistory] = useRecoilState(history);
  const search = useQuery([queryKey.SEARCH, searchText], () => getSuggestion(searchText));
  const [focusedSearch, setFocusedSearch] = useState(false);

  const categories = useQuery(queryKey.CATEGORY, () => getCategories());

  // const getSearchHistory = async () => {
  //   const getSearch = await AsyncStorage.getItem('history');
  //   console.log('얻는중...', getSearch);
  //   if (getSearch !== null) {
  //     setRCHistory(JSON.parse(getSearch));
  //   }
  // };

  const setSearchHistory = async () => {
    const stringifiedArray = JSON.stringify(rcHistory);
    await AsyncStorage.setItem('history', stringifiedArray);
  };

  const deleteHistory = async () => {
    const stringifiedArray = JSON.stringify(rcHistory);
    await AsyncStorage.setItem('history', stringifiedArray);
  };

  const searchSubmit = () => {
    setRCHistory(() => [...rcHistory, searchText]);
    // setSearchHistory();
    navigation.navigate('MapSearchResult', {search: searchText});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          marginHorizontal: 16,
          alignItems: 'center',
        }}
      >
        <View style={{justifyContent: 'center', alignItems: 'center', marginRight: 9}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{flexGrow: 1, justifyContent: 'center'}}>
          <TextInput
            style={[styles.searchInput, focusedSearch ? styles.searchFocus : styles.searchBlur]}
            placeholder="검색어를 입력해주세요."
            placeholderTextColor="#DFDFDF"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            selectionColor={'#6C69FF'}
            onBlur={() => setFocusedSearch(false)}
            onFocus={() => setFocusedSearch(true)}
            onSubmitEditing={searchSubmit}
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={() => setSearchText('')} style={[styles.titleXView]}>
              <View
                style={[
                  DesignSystem.centerArrange,
                  {backgroundColor: '#B7B7B7', width: 18, height: 18, borderRadius: 9},
                ]}
              >
                <Icon name="close" size={14} color="#FFFFFF" style={{position: 'absolute'}} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <KeyboardAwareScrollView contentContainerStyle={{marginTop: 16}}>
        {searchText !== '' ? (
          search.isFetched && (
            <>
              {search.data.map((item, index) => (
                <TouchableOpacity
                  style={{marginTop: 24, marginLeft: 50}}
                  onPress={() => {
                    setRCHistory([...rcHistory, item.suggest]);
                    // setSearchHistory();
                    navigation.navigate('MapSearchResult', {search: item.suggest});
                  }}
                  key={index}
                >
                  <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>{item.suggest}</Text>
                </TouchableOpacity>
              ))}
            </>
          )
        ) : (
          <>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 16,
              }}
            >
              <Text style={[DesignSystem.h3SB, DesignSystem.grey17]}>지난 검색어</Text>
              <TouchableOpacity
                onPress={() => {
                  setRCHistory([]);
                  deleteHistory();
                }}
              >
                <Text style={[DesignSystem.caption1Lt, DesignSystem.grey10]}>지우기</Text>
              </TouchableOpacity>
            </View> */}
            {/* <View>
              <ScrollView horizontal>
                {rcHistory.map((item, index) => (
                  <View key={index}>
                    <Text>{item}</Text>
                  </View>
                ))}
              </ScrollView>
            </View> */}
            <View style={{marginHorizontal: 16}}>
              <Text style={[DesignSystem.h3SB, DesignSystem.grey17]}>추천 태그</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                {categories.isFetched &&
                  categories.data.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate('MapSearchCategory', {category: item});
                      }}
                    >
                      <View
                        style={{
                          paddingHorizontal: 14,
                          paddingVertical: 4,
                          backgroundColor: '#F6F6FE',
                          borderRadius: 20,
                          marginRight: 5,
                          marginBottom: 6,
                        }}
                      >
                        <Text style={[DesignSystem.body2Lt, DesignSystem.purple5]}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 36,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    color: '#111111',
  },
  searchFocus: {
    borderColor: '#6C69FF',
  },
  searchBlur: {
    borderColor: '#DFDFDF',
  },
  titleXView: {
    width: 18,
    height: 18,
    right: 10,
    position: 'absolute',
  },
});
