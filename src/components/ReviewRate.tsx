import React from 'react';
import type {FC} from 'react';
import {Text, View} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';

type ReviewRateProps = {
  name: string;
  storeId: number;
  setRating: (rating: number) => void;
};

export const ReviewRate: FC<ReviewRateProps> = ({setRating, storeId, name}) => {
  return (
    <View>
      <View>
        <Text>음식은 어떠셨나요?</Text>
        <Text>{name}</Text>
      </View>
      <AirbnbRating
        count={5}
        defaultRating={0}
        size={30}
        onFinishRating={(rating: number) => {
          setRating(rating);
        }}
      />
    </View>
  );
};
