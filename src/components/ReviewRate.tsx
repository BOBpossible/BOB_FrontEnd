import React, {useEffect} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Rating} from 'react-native-ratings';
type ReviewRateProps = {
  name: string;
  storeId: number;
  setRating: (rate: number) => void;
  rating: number;
  goNext: () => void;
};

const RATE_STAR = require('../assets/images/Rate_Star.png');
export const ReviewRate: FC<ReviewRateProps> = ({rating, setRating, storeId, name, goNext}) => {
  return (
    <View style={styles.MainContainer}>
      <View>
        <Text style={styles.textStyle}>음식은 어떠셨나요?</Text>
        <Text style={styles.textStyleSmall}>{name}</Text>
        <Rating
          type="custom"
          ratingColor="#f1c40f"
          ratingBackgroundColor="#EFEFEF"
          onFinishRating={(rate: number) => {
            setRating(rate);
            setTimeout(() => {
              goNext();
            }, 1500);
          }}
          startingValue={rating}
          imageSize={49}
          ratingImage={RATE_STAR}
          style={[styles.childView]}
        />
      </View>

      {/* <TouchableOpacity onPress={goNext} style={[styles.reviewConfirmButton]}>
        <View>
          <Text style={[styles.reviewConfirmButtonText]}>확인</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 16,
  },
  childView: {
    marginTop: 150,
  },
  textStyle: {
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 34,
    color: '#111111',
    marginBottom: 8,
  },
  textStyleSmall: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: '#616161',
  },
  reviewConfirmButton: {
    width: '100%',
    height: 56,
    borderRadius: 10,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewConfirmButtonText: {
    color: '#111111',
  },
});
