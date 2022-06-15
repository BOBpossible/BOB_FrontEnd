import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {TouchableOpacity} from 'react-native';

const Map = () => {
  return (
    <SafeAreaView style={[styles.flex]}>
      <View>
        <Text>MAP</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});

export default Map;
