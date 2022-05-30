import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';

export type HomeMissionProps = {
  name: string;
  category: string;
  day: number;
  minCost: number;
  point: number;
};

export const HomeMission: FC<HomeMissionProps> = ({name, category, day, minCost, point}) => {
  return (
    <View style={[styles.missionBox]}>
      <Text style={[styles.dDay]}>D-{day}</Text>
      <View style={[styles.nameBox]}>
        <Text style={[styles.nameText]}>{name}</Text>
        <Text style={[styles.categoryText]}>{category}</Text>
      </View>
      <View style={[styles.seperateLine]} />
      <View style={[styles.contentBox]}>
        <Text>
          <Text style={[styles.boldText]}>{minCost}원 이상</Text>
          <Text>의 식사시 </Text>
          <Text style={[styles.pointText]}>{point}P 적립</Text>
        </Text>
      </View>
      <TouchableOpacity>
        <View style={[styles.missionButton]}>
          <Text>미션 도전!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  missionBox: {
    flex: 1,
    height: 190,
    width: '100%',
    backgroundColor: Colors.white,
  },
  dDay: {position: 'absolute', top: 20, right: 30, fontWeight: '600', color: '#615EFF'},
  nameBox: {flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},
});
