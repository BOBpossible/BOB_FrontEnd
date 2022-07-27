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
  keyword?: string;
  categoryId?: number;
  type: number;
};

export const MapWebview: FC<MapWebviewProps> = ({
  missionId,
  userId,
  webviewRef,
  x,
  y,
  type,
  keyword,
  categoryId,
}) => {
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
          type === 0
            ? {uri: `https://bobplace.netlify.app/${userId}/${y}/${x}`}
            : type === 1
            ? {uri: `https://bobplace.netlify.app/store/${missionId}`}
            : type === 2
            ? {uri: `https://bobplace.netlify.app/search/${userId}/${keyword}/${y}/${x}`}
            : {uri: `https://bobplace.netlify.app/search/tag/${userId}/${categoryId}/${y}/${x}`}
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
        <ActivityIndicator style={{position: 'absolute', alignSelf: 'center'}} size="small" />
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
