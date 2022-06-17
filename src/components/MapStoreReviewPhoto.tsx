import React from 'react';
import {FlatList, Image, StyleSheet, View, Dimensions} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const IMAGESIZE = WIDTH / 3;
const imagedata = [
  {uri: 'https://source.unsplash.com/1024x768/?tree'},
  {uri: 'https://source.unsplash.com/1024x768/?girl'},
  {uri: 'https://source.unsplash.com/1024x768/?boy'},
  {uri: 'https://source.unsplash.com/1024x768/?water'},
  {uri: 'https://source.unsplash.com/1024x768/?moon'},
  {uri: 'https://source.unsplash.com/1024x768/?tree'},
  {uri: 'https://source.unsplash.com/1024x768/?woman'},
  {uri: 'https://source.unsplash.com/1024x768/?man'},
];

export const MapStoreReviewPhoto = () => {
  return (
    <View style={[styles.reviewPhotoWrap]}>
      <FlatList
        data={imagedata}
        renderItem={({item}) => (
          <View style={{borderColor: '#FFFFFF', borderWidth: 1}}>
            <Image source={{uri: item.uri}} style={{height: IMAGESIZE - 2, width: IMAGESIZE - 2}} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  reviewPhotoWrap: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
