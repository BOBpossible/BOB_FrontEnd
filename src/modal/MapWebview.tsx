import React, {FC, useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import StoreModal from './StoreModal';

type MapWebviewProps = {
  id?: number;
  userId?: number;
};

export const MapWebview: FC<MapWebviewProps> = ({id, userId}) => {
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
        source={
          id === undefined
            ? {uri: `https://bobplace.netlify.app/${userId}`} //여기에 userId 뒤에 넣어줘야함!
            : {uri: `https://bobplace.netlify.app/store/${id}`}
        }
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
