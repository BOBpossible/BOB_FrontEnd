import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

export const MyWriteInquiry = () => {
  const [focusedTitle, setFocusedTitle] = useState(false);
  const [focusedBody, setFocusedBody] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    console.log('문의 제출');
  };
  return (
    <View style={[styles.totalWrap]}>
      <View style={{flex: 1}}>
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
            <Image
              source={require('../../assets/images/closeCircle.png')}
              style={[styles.titleX]}
            />
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
      </View>
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
    height: 44,
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
    width: 18,
    height: 18,
    right: 26,
  },
  titleX: {
    width: 18,
    height: 18,
  },
  bodyWrap: {
    marginTop: 16,
  },
  bodyInput: {
    width: '100%',
    height: 220,
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
  buttonWrap: {justifyContent: 'center', alignItems: 'center', marginBottom: 20},
  buttonStyle: {
    width: '100%',
    height: 56,
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
