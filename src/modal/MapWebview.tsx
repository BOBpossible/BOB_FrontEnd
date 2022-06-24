import React, {useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

export const MapWebview = () => {
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const onClickPin = (event: WebViewMessageEvent) => {
    console.log(event.nativeEvent.data);
  };

  return (
    <View style={[styles.webviewWrap]}>
      <WebView
        source={{uri: 'https://bobplace.netlify.app/'}}
        onMessage={(event) => {
          onClickPin(event);
        }}
        onLoad={() => {
          setIsLoadingMap(false);
        }}
      />
      {isLoadingMap && (
        <ActivityIndicator style={{position: 'absolute', alignSelf: 'center'}} size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  webviewWrap: {
    flex: 1,
    justifyContent: 'center',
  },
});
