import React, {useState} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export type MissionProcessProps = {
  status?: string; //"start","request","onrequest","success", "review"
};

export const MissionProcess: FC<MissionProcessProps> = ({status}) => {
  const nowOnProgress = () => {
    //prettier-ignore
    return (
      <>
        <View style={{width:14, height:14}}>
           <View style={[styles.activeCircleBack, {position: 'relative', right: 4, bottom: 4}]} />
           <View style={[styles.activeCircle, {position: 'relative', bottom: 22, zIndex: 1}]} />
        </View>
        <View style={[styles.activeLine, {borderColor: '#C8C8C8'}]} />
        <View style={[styles.activeCircle, {backgroundColor:'#C8C8C8'}]} />
      </>
    );
  };
  const nowOnSuccess = () => {
    //prettier-ignore
    return (
        <>
          <View style={[styles.doneCircle]} />
          <View style={[styles.activeLine]} />
          <View style={{width:14, height:14}}>
           <View style={[styles.activeCircleBack, {position: 'relative', right: 4, bottom: 4}]} />
           <View style={[styles.activeCircle, {position: 'relative', bottom: 22, zIndex: 1}]} />
        </View>
        </>
      );
  };
  //prettier-ignore
  return (
    <View style={[styles.processWrap]}>
      <View style={[styles.processTextRow]}>
        <Text style={{color: '#949494'}}>도전!</Text>
        <Text style={[styles.processCenter, status === 'request' || status === 'onrequest' ? styles.activeProcess : {color: '#949494'}]}>진행중</Text>
        <Text style={[status === 'success' ? styles.activeProcess : {color: '#949494'}]}>도전 성공</Text>
      </View>
      <View style={[styles.processCircleRow]}>
        <View style={[styles.doneCircle]} />
        <View style={[styles.activeLine]} />
        {status === 'success' ? nowOnSuccess() : nowOnProgress()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  processWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 19,
    marginBottom: 14,
  },
  processTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 9,
    width: 212,
  },
  processCenter: {
    marginLeft: 54,
    marginRight: 49,
  },
  activeProcess: {
    color: '#111111',
  },
  processCircleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircleBack: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#AAAAF9',
    opacity: 0.5,
  },
  doneCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2A2A2A',
  },
  activeCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#6C69FF',
    zIndex: -1,
  },
  inactiveCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2A2A2A',
  },
  activeLine: {
    borderWidth: 0.5,
    width: 72,
    borderColor: 'black',
    zIndex: -1,
  },
});
