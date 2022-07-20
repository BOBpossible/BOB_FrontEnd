import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, SafeAreaView, Animated, StatusBar} from 'react-native';

const moveUp = (progressValue: Animated.Value) => {
  Animated.timing(progressValue, {
    toValue: 60, //
    duration: 400, //
    useNativeDriver: false,
  }).start();
};

const Splash = () => {
  const [progressValue] = useState(new Animated.Value(30));

  setTimeout(() => {
    moveUp(progressValue);
  }, 300);

  return (
    <SafeAreaView style={[styles.flex]}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />

      <View style={[styles.imageWrap]}>
        <View style={{marginBottom: 28}}>
          <Image
            source={require('../../assets/images/bob_place.png')}
            style={{width: 219, height: 30}}
            resizeMode="contain"
          />
        </View>
        <Image source={require('../../assets/images/bobpool.png')} style={[styles.logoImage]} />
        <Animated.View style={[styles.postionAbs, {bottom: progressValue}]}>
          <Image
            source={require('../../assets/images/bobpoolFace.png')}
            style={[styles.logoFace]}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#6C69FF', alignItems: 'center', justifyContent: 'center'},
  splashTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
    lineHeight: 38,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  logoImage: {
    width: 134,
    height: 88,
  },
  logoFace: {
    width: 24,
    height: 10,
  },
  postionAbs: {
    position: 'absolute',
  },
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;
