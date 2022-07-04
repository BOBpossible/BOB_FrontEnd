import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {DesignSystem} from '../assets/DesignSystem';

export type MissionCardProps = {
  missionId: number;
  name: string;
  category: string;
  day?: number;
  minCost: number;
  point: number;
  status?: string; //"start","request","onrequest","success", "review"
  // handleOnPress?: () => void;
};
export type MissionCardContentProps = {
  handleOnPress?: () => void;
  text: string;
  textColor?: string;
  cancelBgColor?: string;
  cancelTextColor?: string;
  bgColor?: string;
};

//prettier-ignore
export const HomeMissionCard: FC<MissionCardProps> = ({missionId, name, category, minCost, point, status}) => {
    const navigation = useNavigation();
    return (
    <View style={[styles.missionCardWrap]}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeMissionDetails', {missionId:missionId})} style={[styles.missionCard]}>
        <View style={[styles.missionMain]}>
          <View style={[styles.nameBox]}>
            <Text style={[DesignSystem.title4Md, DesignSystem.grey17, {marginBottom: 4}]}>{name}</Text>
            <Text style={[DesignSystem.body2Lt, DesignSystem.grey10, {marginBottom: 16}]}>{category}</Text>
          </View>
          <View style={[styles.seperateLine]} />
          <View style={[DesignSystem.centerArrange, styles.missionContentBox]}>
            <Text>
              <Text style={[DesignSystem.title4Md]}>{minCost}원 이상</Text>
              <Text style={[DesignSystem.body1Lt]}>의 식사시 </Text>
              <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>{point}P 적립</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  missionCardWrap: {
    marginLeft: 16,
    marginRight: 16,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  missionCard: {
    marginTop: 24,
    borderRadius: 12,
    alignItems: 'center', //
  },
  nameBox: {flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},
  missionMain: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperateLine: {
    borderWidth: 0.5,
    width: 303,
    borderColor: '#DFDFDF',
    marginBottom: 20,
  },
  missionContentBox: {
    marginBottom: 20,
  },
});
