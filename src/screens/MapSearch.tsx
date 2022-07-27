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
import {getSuggestion} from '../api';
import {DesignSystem} from '../assets/DesignSystem';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import {history} from '../state';

export const MapSearch = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [RCHistory, setRCHistory] = useRecoilState(history);
  const search = useQuery([queryKey.SEARCH, searchText], () => getSuggestion(searchText));
  const [focusedSearch, setFocusedSearch] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getSearchHistory();
    }
  }, [isFocused]);

  const getSearchHistory = async () => {
    const getSearch = await AsyncStorage.getItem('history');
    if (getSearch !== null) {
      setRCHistory(JSON.parse(getSearch));
    }
  };

  const setSearchHistory = async (data: string) => {
    setRCHistory([...RCHistory, data]);
    console.log('상태에 추가하고 난뒤:', RCHistory);
    const stringifiedArray = JSON.stringify(RCHistory);
    console.log('string array: ', stringifiedArray);
    await AsyncStorage.setItem('history', stringifiedArray);
  };

  const deleteHistory = async () => {
    await setRCHistory([]);
    const stringifiedArray = JSON.stringify(RCHistory);
    await AsyncStorage.setItem('history', stringifiedArray);
  };

  const searchSubmit = async () => {
    setSearchHistory(searchText);
    navigation.navigate('MapSearchResult');
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

      <KeyboardAwareScrollView contentContainerStyle={{marginTop: 14}}>
        {searchText !== '' ? (
          search.isFetched && (
            <>
              {search.data.map((item, index) => (
                <TouchableOpacity
                  style={{marginTop: 24, marginLeft: 50}}
                  onPress={() => {
                    navigation.navigate('MapSearchResult', {search: searchText});
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 16,
              }}
            >
              <Text style={[DesignSystem.h3SB, DesignSystem.grey17]}>지난 검색어</Text>
              <TouchableOpacity onPress={deleteHistory}>
                <Text style={[DesignSystem.caption1Lt, DesignSystem.grey10]}>지우기</Text>
              </TouchableOpacity>
            </View>
            <View>
              <ScrollView horizontal>
                {RCHistory.map((item) => (
                  <View>
                    <Text>{item}</Text>
                  </View>
                ))}
              </ScrollView>
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
