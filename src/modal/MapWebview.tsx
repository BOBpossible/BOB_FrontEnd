import React, {FC, useRef, useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import StoreModal from './StoreModal';

type MapWebviewProps = {
  missionId?: number;
  userId?: number;
  webviewRef?: React.MutableRefObject<WebView<{}> | null>;
  x?: string;
  y?: string;
};

export const MapWebview: FC<MapWebviewProps> = ({missionId, userId, webviewRef, x, y}) => {
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
        ref={webviewRef}
        source={
          missionId === undefined
            ? {uri: `https://bobplace.netlify.app/${userId}/${y}/${x}`}
            : {uri: `https://bobplace.netlify.app/store/${missionId}`}
        }
        onMessage={(event) => {
          onClickPin(event);
        }}
        onLoad={() => {
          setIsLoadingMap(false);
        }}
        geolocationEnabled={true}
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
