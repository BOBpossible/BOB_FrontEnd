import React, {useState} from 'react';
import {SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {queryKey} from '../api/queryKey';
import {postSuggestion} from '../api';

export const MapSearch = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const search = useQuery([queryKey.SEARCH, searchText], () => postSuggestion(searchText));
  console.log(searchText);
  console.log(search.data);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          marginHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <TextInput
          style={{
            width: 318,
            height: 36,
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 8,
            paddingVertical: 6,
          }}
          placeholder="검색어를 입력해주세요."
          placeholderTextColor="#DFDFDF"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {search.isFetched && (
        <View>
          {search.data.map((item) => (
            <Text>{item.suggest}</Text>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};
