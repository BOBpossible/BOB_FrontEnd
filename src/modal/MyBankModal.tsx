import React from 'react';
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

type ReviewModalProps = {
  visible: boolean;
  closeBankModal: () => void;
};
//prettier-ignore
const BANKIMAGES = [
    require('../assets/images/banks/1.png'), require('../assets/images/banks/2.png'), require('../assets/images/banks/3.png'), require('../assets/images/banks/4.png'), require('../assets/images/banks/5.png'), require('../assets/images/banks/6.png'), require('../assets/images/banks/7.png'), require('../assets/images/banks/8.png'), require('../assets/images/banks/9.png'), require('../assets/images/banks/10.png'),
     require('../assets/images/banks/11.png'), require('../assets/images/banks/12.png'), require('../assets/images/banks/13.png'), require('../assets/images/banks/14.png'), require('../assets/images/banks/15.png'), require('../assets/images/banks/16.png'), require('../assets/images/banks/17.png'), require('../assets/images/banks/18.png'), require('../assets/images/banks/19.png'), require('../assets/images/banks/20.png'),
     require('../assets/images/banks/21.png'), require('../assets/images/banks/22.png'),
];
const MyBankModal: FC<ReviewModalProps> = ({visible, closeBankModal}) => {
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
              <TouchableOpacity key={index} onPress={() => console.log(index)}>
                <Image source={item} style={{width: 103, height: 69}} />
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
});
