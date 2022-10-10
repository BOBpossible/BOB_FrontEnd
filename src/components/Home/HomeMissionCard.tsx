import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DesignSystem} from '../../assets/DesignSystem';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type MissionCardProps = {
  missionId: number;
  name: string;
  category: string;
  mission: string;
  point: number;
  status: string; //도전 전 NEW  성공요청 PROGRESS 성공요청중 CHECKING 성공 DONE
  challengeStatus: boolean; //도전중이라면 true, 아니면 false
};

//prettier-ignore
export const HomeMissionCard: FC<MissionCardProps> = ({missionId, name, category, mission, point, status, challengeStatus}) => {
    const navigation = useNavigation();
    return (
    <View pointerEvents={challengeStatus ? 'none' : 'auto'}>
      {status !== 'DONE' && (
      <TouchableOpacity onPress={() => navigation.navigate('HomeMissionDetails', {missionId: missionId})} style={[styles.missionCardWrap]}>
        <View style={[styles.missionCard]}>
          <View style={[styles.missionMain]}>
            <View style={[styles.nameBox]}>
            <View style={{flexDirection: 'row', marginBottom: 4, alignItems: 'center'}}>
            <Icon
                name="chevron-right"
                size={18}
                color="#616161"
                style={{marginLeft: 4, opacity: 0}}
              />
              <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>{name}</Text>
              <Icon name="chevron-right" size={18} color="#616161" style={{marginLeft: 4}} />
              </View>
              <Text style={[DesignSystem.body2Lt, DesignSystem.grey10, styles.textMargin]}>{category}</Text>
            </View>
            <View style={[DesignSystem.centerArrange, styles.missionContentBox]}>
              <Text>
                <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>{mission} </Text>
                <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>결제시 </Text>
                <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>{point}P 적립</Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  missionCardWrap: {
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: Platform.OS === 'ios' ? hp(calHeight(12, true)) : hp(calHeight(12)),
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  missionCard: {
    marginTop: Platform.OS === 'ios' ? hp(calHeight(24, true)) : hp(calHeight(24)),
    borderRadius: 12,
    alignItems: 'center',
  },
  missionMain: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameBox: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    marginBottom: Platform.OS === 'ios' ? hp(calHeight(18, true)) : hp(calHeight(18)),
  },
  missionContentBox: {
    marginBottom: Platform.OS === 'ios' ? hp(calHeight(19, true)) : hp(calHeight(19)),
  },
  textMargin: {
    marginBottom: Platform.OS === 'ios' ? hp(calHeight(12, true)) : hp(calHeight(12)),
  },
});
