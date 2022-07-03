import React, { useEffect } from 'react';
import type {FC} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type MyBankModalProps = {
  visible: boolean;
  closeBankModal: () => void;
  selectedBank: string;
  setSelectedBank: (i: string) => void;
};
//prettier-ignore
const BANKIMAGES = [
    {name: 'KB국민', imgSrc: require('../assets/images/banks/1.png')}, {name: 'IBK기업', imgSrc: require('../assets/images/banks/2.png')}, {name: 'NH농협', imgSrc: require('../assets/images/banks/3.png')}, {name: '신한', imgSrc: require('../assets/images/banks/4.png')}, {name: '우리', imgSrc: require('../assets/images/banks/5.png')}, {name: '한국시티', imgSrc: require('../assets/images/banks/6.png')}, {name: '토스뱅크', imgSrc: require('../assets/images/banks/7.png')}, {name: '카카오뱅크', imgSrc: require('../assets/images/banks/8.png')}, {name: 'SC제일', imgSrc: require('../assets/images/banks/9.png')}, {name: '하나', imgSrc: require('../assets/images/banks/10.png')},
    {name: '대구', imgSrc: require('../assets/images/banks/11.png')}, {name: '경남', imgSrc: require('../assets/images/banks/12.png')}, {name: 'KDB산업', imgSrc: require('../assets/images/banks/13.png')}, {name: '우체국', imgSrc: require('../assets/images/banks/14.png')}, {name: '수협', imgSrc: require('../assets/images/banks/15.png')}, {name: '광주', imgSrc: require('../assets/images/banks/16.png')}, {name: 'SBI저축은행', imgSrc: require('../assets/images/banks/17.png')}, {name: '새마을금고', imgSrc: require('../assets/images/banks/18.png')}, {name: '케이뱅크', imgSrc: require('../assets/images/banks/19.png')}, {name: '부산', imgSrc: require('../assets/images/banks/20.png')},
    {name: '전북', imgSrc: require('../assets/images/banks/21.png')}, {name: '제주', imgSrc: `require('../assets/images/banks/22.png')`},
];

const MyBankModal: FC<MyBankModalProps> = ({visible, closeBankModal, selectedBank, setSelectedBank}) => {
  const height = Dimensions.get('screen').height;
  const modalWidth = Dimensions.get('screen').width - 33;
  const insets = useSafeAreaInsets();
  const listSnapPoint = height - insets.top - 120;

  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType="fade">
      <View style={[styles.overlay]}>
        <TouchableWithoutFeedback onPress={closeBankModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View style={[styles.bottomSheetContainer, {height: listSnapPoint}]}>
          <View style={[styles.bankHeader]}>
            <Text style={[styles.bankChoiceText]}>은행 선택</Text>
            <TouchableOpacity onPress={closeBankModal}>
              <Text style={[styles.body1Lt, {marginRight: 16}]}>닫기</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={BANKIMAGES}
            columnWrapperStyle={{width: modalWidth, justifyContent: 'space-between'}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity key={index} onPress={() => setSelectedBank(item['name'])}>
                {/* //closeBankModal도해야하는데... */}
                <View
                  style={[styles.banksWrap, selectedBank === item.name && styles.selectedBanksWrap]}
                >
                  <Image source={item['imgSrc']} style={{marginBottom: 4}} />
                  <Text style={{color: '#383838', fontFamily: 'Pretendard-Medium', fontSize: 14}}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{marginTop: 16}} />}
            numColumns={3}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MyBankModal;

const styles = StyleSheet.create({
  body1Lt: {
    color: '#616161',
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bankHeader: {
    width: '100%',
    marginTop: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankChoiceText: {
    marginLeft: 20,
    fontFamily: 'Pretendard-SemiBold',
    color: '#111111',
    fontSize: 22,
  },
  banksWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 103,
    height: 69,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DFDFDF',
  },
  selectedBanksWrap: {
    borderColor: '#6C69FF',
    backgroundColor: '#F6F6FE',
  },
});
