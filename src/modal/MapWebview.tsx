import React, {useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import StoreModal from './StoreModal';

export const MapWebview = () => {
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [storeId, setStoreId] = useState(0);
  const [storeModal, setStoreModal] = useState(false);
  const onClickPin = async (event: WebViewMessageEvent) => {
    await setStoreId(parseInt(event.nativeEvent.data, 10));
    setStoreModal(true);
    //console.log(event.nativeEvent.data);
  };

  return (
    <View style={[styles.webviewWrap]}>
      <StoreModal
        storeId={storeId}
        visible={storeModal}
        closeStoreModal={() => setStoreModal(false)}
      />
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
