import React, {useEffect, useRef, useState} from 'react';
import type {FC} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MapStoreReviewList, MapStoreReviewPhoto} from '../components';
import {useStyle} from '../hooks';
import {useQuery} from 'react-query';
import {queryKey} from '../api/queryKey';
import {getStoreData} from '../api/store';
import {IStoreData} from '../data';

type StoreModalProps = {
  storeId: number;
  visible: boolean;
  closeStoreModal: () => void;
};

const StoreModal: FC<StoreModalProps> = ({storeId, visible, closeStoreModal}) => {
  const [isReview, setIsReview] = useState(false);
  const offset1 = useRef(new Animated.Value(0)).current;
  const headerTextStyle = useStyle({
    opacity: offset1.interpolate({
      inputRange: [250, 260],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  });
  const storeData = useQuery<IStoreData>([queryKey.STOREDATA, storeId], () =>
    getStoreData(storeId),
  );

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={closeStoreModal}>
      <SafeAreaView style={[styles.safeView]}>
        <View style={[styles.modalHeader]}>
          <TouchableOpacity onPress={closeStoreModal}>
            <View style={[styles.backButton]}>
              <Icon name="arrow-left" size={24} color="#2A2A2A" />
            </View>
          </TouchableOpacity>
          <Animated.View style={[headerTextStyle]}>
            <Text style={[styles.storeHeaderText]}>{storeData.data?.name}</Text>
          </Animated.View>
          <View style={[styles.backButton, {opacity: 0}]}>
            <Icon name="arrow-left" size={24} color="black" />
          </View>
        </View>

        {isReview ? ( //리뷰
          <MapStoreReviewList
            storeData={storeData.data}
            isReview={isReview}
            setIsReview={setIsReview}
            offset={offset1}
            reviewCount={storeData.data?.reviewCount}
          />
        ) : (
          //리뷰사진
          <MapStoreReviewPhoto
            storeData={storeData.data}
            isReview={isReview}
            setIsReview={setIsReview}
            offset={offset1}
            reviewCount={storeData.data?.reviewCount}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default StoreModal;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: '#FFFFFF'},
  modalHeader: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    marginLeft: 16,
    marginRight: 16,
  },
  storeInfoWrap: {
    height: 100,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  storeHeaderText: {
    fontFamily: 'Pretendard-SeniBold',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  reviewToggleWrap: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
  },
  reviewButton: {
    width: 178,
    height: 41,
    borderRadius: 41,
    backgroundColor: '#2A2A2A',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '300',
    marginRight: 4,
  },
});
