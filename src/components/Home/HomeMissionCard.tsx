import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DesignSystem} from '../../assets/DesignSystem';

export type MissionCardProps = {
  missionId: number;
  name: string;
  category: string;
  mission: string;
  point: number;
  status?: boolean;
};

//prettier-ignore
export const HomeMissionCard: FC<MissionCardProps> = ({missionId, name, category, mission, point}) => {
    const navigation = useNavigation();
    return (
    <TouchableOpacity onPress={() => navigation.navigate('HomeMissionDetails', {missionId: missionId})} style={[styles.missionCardWrap]}>
      <View style={[styles.missionCard]}>
        <View style={[styles.missionMain]}>
          <View style={[styles.nameBox]}>
            <Text style={[DesignSystem.title4Md, DesignSystem.grey17, {marginBottom: 4}]}>{name}</Text>
            <Text style={[DesignSystem.body2Lt, DesignSystem.grey10, {marginBottom: 16}]}>{category}</Text>
          </View>
          <View style={[DesignSystem.centerArrange, styles.missionContentBox]}>
            <Text>
              <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>{mission}</Text>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>식사시 </Text>
              <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>{point}P 적립</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  missionCardWrap: {
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  missionCard: {
    marginTop: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  nameBox: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  missionMain: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  missionContentBox: {
    marginBottom: 20,
  },
});