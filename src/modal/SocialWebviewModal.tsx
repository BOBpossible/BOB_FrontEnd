import React, {FC} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SocialWebview from './SocialWebview';

type SocialWebViewModalProps = {
  visible: boolean;
  source: string;
  closeSocialModal: () => void;
};

const SocialWebviewModal: FC<SocialWebViewModalProps> = ({visible, source, closeSocialModal}) => {
  return (
    <Modal
      presentationStyle="pageSheet"
      animationType="slide"
      visible={visible}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={closeSocialModal} style={[styles.backButton]} activeOpacity={1}>
          <View>
            <Icon name="arrow-left" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <SocialWebview source={source} closeSocialModal={closeSocialModal} />
      </SafeAreaView>
    </Modal>
  );
};
export default SocialWebviewModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    height: 70,
    width: 70,
    padding: 15,
  },
});
