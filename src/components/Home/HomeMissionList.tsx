import React from 'react';
import {View, StyleSheet, Animated, Platform} from 'react-native';
import {HomeMissionCard} from '../../components/Home/HomeMissionCard';
import {HomeMissionListHeader} from '../../components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import {useQuery} from 'react-query';
import {IHomeData, IMissionsProgress} from '../../data';
import {queryKey} from '../../api/queryKey';
import {HomeBobpool} from '../../components/Home/HomeBobpool';
import {getMissionsProgress} from '../../api/mission';

type HomeMissionListProps = {
  homeData: IHomeData | undefined;
  offset: Animated.Value;
  allDone: boolean;
};

export const HomeMissionList = ({homeData, offset, allDone}: HomeMissionListProps) => {
  const DataMissionsProgress = useQuery<IMissionsProgress[]>(
    queryKey.MISSIONSPROGRESS,
    getMissionsProgress,
  );
  const hasMissions = homeData?.missions !== null;

  return (
    <Animated.FlatList
      style={DataMissionsProgress.data?.length !== 0 && {opacity: 0.5}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.missionListContainer]}
      scrollEventThrottle={10}
      data={homeData?.missions}
      renderItem={({item}) => (
        <HomeMissionCard
          mission={item.mission}
          missionId={item.missionId}
          status={item.missionStatus}
          point={item.point}
          category={item.storeCategory}
          name={item.storeName}
          challengeStatus={DataMissionsProgress.data?.length !== 0}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        hasMissions ? (
          <HomeMissionListHeader dday={homeData?.dday} allDone={allDone} />
        ) : (
          <HomeBobpool category={'NO'} />
        )
      }
      ListFooterComponent={hasMissions && allDone ? <HomeBobpool category={'DONE'} /> : <View />}
      ListFooterComponentStyle={hasMissions && !allDone && styles.mainPaddingBottom}
      onScroll={(event) => {
        Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
          useNativeDriver: false,
        })(event);
      }}
    />
  );
};

const styles = StyleSheet.create({
  missionListContainer: {
    paddingTop: Platform.OS === 'ios' ? hp(calHeight(230, true)) : hp(calHeight(230)),
    paddingBottom: 10,
    backgroundColor: '#F6F6FA',
  },
  mainPaddingBottom: {
    paddingBottom: Platform.OS === 'ios' ? hp(calHeight(80, true)) : hp(calHeight(80)),
  },
});
