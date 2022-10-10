import React, {useState} from 'react';
import type {FC} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../assets/CalculateLength';
import {DesignSystem} from '../assets/DesignSystem';
import {queryKey} from '../api/queryKey';
import {IgetUsersMe} from '../data';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getUserInfo, patchUserInfo} from '../api';

type EditNameModalProps = {
  visible: boolean;
  close: () => void;
};

const EditNameModal: FC<EditNameModalProps> = ({visible, close}) => {
  const queryClient = useQueryClient();
  const [editName, setEditName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const userInfo = useQuery<IgetUsersMe>(queryKey.USERINFO, getUserInfo, {
    onSuccess(data) {
      setEditName(data.name);
      setEmail(data.email);
    },
  });
  const nameEditMutation = useMutation(
    (data: {name: string; email: string}) => patchUserInfo(data),
    {
      onSuccess(data) {
        console.log('유저 이름 업데이트 성공: ', data);
        queryClient.invalidateQueries(queryKey.USERINFO);
      },
    },
  );

  const MARGINBOTTOM = Dimensions.get('screen').height / 2 - 80;
  const handleSubmit = () => {
    nameEditMutation.mutate({name: editName, email: email});
    close();
  };

  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType="fade">
      <TouchableOpacity style={[styles.overlay]} activeOpacity={1} onPress={close}>
        <View style={styles.background} />
        <TouchableWithoutFeedback>
          <View style={[styles.modalContainer, {marginBottom: MARGINBOTTOM}]}>
            <View style={{marginBottom: 20}}>
              <Text style={[styles.body1Lt, {marginBottom: 12}]}>닉네임 변경</Text>
              <TextInput
                style={[styles.nameInput, styles.body1Lt]}
                onChangeText={(text) => {
                  setEditName(text);
                }}
                value={editName}
                placeholder="닉네임을 입력"
                placeholderTextColor="#949494"
                selectionColor={'#6C69FF'}
                maxLength={10}
              />
            </View>
            <View style={[styles.buttonWrap]}>
              <TouchableOpacity style={[styles.buttonStyle, styles.cancelButton]} onPress={close}>
                <Text style={[DesignSystem.title2Regular, DesignSystem.grey10]}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonStyle, styles.okButton]}
                onPress={handleSubmit}
              >
                <Text style={[DesignSystem.title1SB, {color: 'white'}]}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default EditNameModal;

const styles = StyleSheet.create({
  body1Lt: {
    color: '#616161',
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
  },
  title1SB: {
    color: '#111111',
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  modalContainer: {
    width: wp(calWidth(342)),
    marginLeft: 16,
    marginRight: 17,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: wp(calWidth(145)),
    height: Platform.OS === 'ios' ? hp(calHeight(48, true)) : hp(calHeight(48)),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#949494',
  },
  okButton: {
    backgroundColor: '#6C69FF',
  },
  nameInput: {
    width: '100%',
    height: Platform.OS === 'ios' ? hp(calHeight(44, true)) : hp(calHeight(44)),
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 8,
    color: '#111111',
    borderWidth: 1,
    borderColor: '#DFDFDF',
  },
});
