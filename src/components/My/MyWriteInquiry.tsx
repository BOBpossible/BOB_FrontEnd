import React, {FC, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

// eslint-disable-next-line prettier/prettier
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMutation, useQueryClient} from 'react-query';
import {postQuestions} from '../../api/my';
import {calHeight, calWidth} from '../../assets/CalculateLength';
import {DesignSystem} from '../../assets/DesignSystem';
import DoneModal from '../../modal/DoneModal';
export type goWriteProps = {
  setNowWrite: any;
};

export const MyWriteInquiry: FC<goWriteProps> = ({setNowWrite}) => {
  const [focusedTitle, setFocusedTitle] = useState(false);
  const [focusedBody, setFocusedBody] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const queryClient = useQueryClient();
  const [doneModal, setDoneModal] = useState(false);

  const questionMutation = useMutation(
    (data: {content: string; title: string}) => postQuestions(data),
    {
      onSuccess: (data) => {
        console.log('문의하기 성공: ', data);
        queryClient.invalidateQueries('questions');
        setDoneModal(true);
      },
      onError: (err) => {
        console.log('문의하기 실패: ', err);
      },
    },
  );

  const handleSubmit = async () => {
    await questionMutation.mutate({content: body, title: title});
    console.log('문의 제출');
  };
  const closeDoneModal = () => {
    setDoneModal(false);
    setNowWrite(false);
  };

  return (
    <View style={[styles.totalWrap]}>
      <View style={{flex: 1}}>
        <KeyboardAvoidingView
          style={[{flex: 1}]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView scrollEnabled={false}>
            <View style={[styles.titleWrap]}>
              <TextInput
                style={[styles.nameInput, focusedTitle ? styles.focusBorder : styles.unfocusBorder]}
                onChangeText={(text) => {
                  setTitle(text);
                }}
                value={title}
                placeholder="문의 제목 입력"
                selectionColor={'#6C69FF'}
                onBlur={() => setFocusedTitle(false)}
                onFocus={() => setFocusedTitle(true)}
              />
              <TouchableOpacity onPress={() => setTitle('')} style={[styles.titleXView]}>
                <View
                  style={[
                    DesignSystem.centerArrange,
                    {backgroundColor: '#B7B7B7', width: 18, height: 18, borderRadius: 9},
                  ]}
                >
                  <Icon name="close" size={14} color="#FFFFFF" style={{position: 'absolute'}} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.bodyWrap]}>
              <TextInput
                style={[styles.bodyInput]}
                onChangeText={(text) => {
                  setBody(text);
                }}
                value={body}
                placeholder="문의 내용 작성"
                multiline={true}
                selectionColor={'#6C69FF'}
                onBlur={() => setFocusedBody(false)}
                onFocus={() => setFocusedBody(true)}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.buttonWrap]}
          disabled={title !== '' && body !== '' ? false : true}
        >
          {title !== '' && body !== '' ? (
            <View style={[styles.buttonStyle, styles.activeButton]}>
              <Text style={[styles.activeButtonText]}>문의하기</Text>
            </View>
          ) : (
            <View style={[styles.buttonStyle, styles.inactiveButton]}>
              <Text style={[styles.inactiveButtonText]}>문의하기</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <DoneModal visible={doneModal} closeDoneModal={closeDoneModal} category={'문의'} />
    </View>
  );
};

const styles = StyleSheet.create({
  totalWrap: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 23,
    flex: 1,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInput: {
    width: '100%',
    height: Platform.OS === 'ios' ? hp(calHeight(44, true)) : hp(calHeight(44)),
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#111111',
  },
  focusBorder: {borderColor: '#6C69FF', borderWidth: 1},
  unfocusBorder: {borderColor: '#DFDFDF', borderWidth: 1},
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  titleXView: {
    width: wp(calWidth(18)),
    height: hp(calHeight(18)),
    right: wp(calWidth(26)),
  },
  titleX: {
    width: wp(calWidth(18)),
    height: hp(calHeight(18)),
  },
  bodyWrap: {
    marginTop: 16,
  },
  bodyInput: {
    width: '100%',
    height: Platform.OS === 'ios' ? hp(calHeight(220, true)) : hp(calHeight(220)),
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#111111',
    alignItems: 'center',
    textAlignVertical: 'top',
  },
  //
  buttonWrap: {justifyContent: 'center', alignItems: 'center', marginBottom: 16},
  buttonStyle: {
    width: '100%',
    height: hp(calHeight(56)),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  activeButton: {backgroundColor: '#6C69FF'},
  inactiveButton: {backgroundColor: '#E8E8E8'},
  activeButtonText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    color: '#FFFFFF',
  },
  inactiveButtonText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    color: '#C8C8C8',
  },
});
