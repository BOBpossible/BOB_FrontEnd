import React from 'react';
import type {FC} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform} from 'react-native';
import {Rating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageLibraryOptions, launchImageLibrary} from 'react-native-image-picker';
import {DesignSystem} from '../assets/DesignSystem';

type imageData = {
  uri: string;
  type: string;
  name: string;
};

type ReviewWriteProps = {
  name: string;
  submitReview: () => void;
  rating: number;
  setRating: (rating: number) => void;
  reviewContent: string;
  setReviewContent: React.Dispatch<React.SetStateAction<string>>;
  imageUri: imageData[];
  setImageUri: React.Dispatch<React.SetStateAction<imageData[]>>;
};

const options: ImageLibraryOptions = {
  mediaType: 'photo',
  maxWidth: 200,
  maxHeight: 200,
  quality: 0.5,
};
const REVIEW_RATE_TEXT = [
  '별로였어요',
  '그저 그랬어요',
  '괜찮았어요',
  '맛있었어요',
  '너무 맛있었어요',
];

const RATE_STAR = require('../assets/images/Rate_Star.png');
export const ReviewWrite: FC<ReviewWriteProps> = ({
  name,
  submitReview,
  rating,
  setRating,
  imageUri,
  setImageUri,
  reviewContent,
  setReviewContent,
}) => {
  const showImageLibrary = async () => {
    const result = await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('취소');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      }
    });
    if (result.assets) {
      const data: imageData = {
        uri: result.assets[0].uri as string,
        type: result.assets[0].type as string,
        name: result.assets[0].fileName as string,
      };
      setImageUri([...imageUri, data]);
    }
    console.log(result);
  };
  return (
    <View style={[styles.mainContainer]}>
      <View style={[styles.reviewContainer]}>
        <Rating
          type="custom"
          ratingColor="#f1c40f"
          ratingBackgroundColor="#EFEFEF"
          onFinishRating={setRating}
          startingValue={rating}
          imageSize={35}
          ratingImage={RATE_STAR}
          style={[styles.childView]}
        />
        <Text style={[DesignSystem.body2Lt, styles.rateReviewText]}>{REVIEW_RATE_TEXT[rating - 1]}</Text>
        <TextInput
          style={[styles.reviewContent]}
          multiline={true}
          placeholder={'리뷰내용 작성'}
          selectionColor={'#6C69FF'}
          onChangeText={(text) => {
            setReviewContent(text);
          }}
          value={reviewContent}
        />
        <View style={[styles.ImageSelectContainer]}>
          <View style={[styles.flexRow]}>
            <Text>사진 첨부</Text>
            <Text>1/3</Text>
          </View>

          <View style={[styles.flexRow]}>
            <TouchableOpacity style={[styles.imageAddButton]} onPress={showImageLibrary}>
              <Icon name="plus" size={24} />
            </TouchableOpacity>
            {imageUri.map((data) => {
              return (
                <View style={{marginRight: 8}}>
                  <Image source={{uri: data.uri}} style={{width: 80, height: 80}} />
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={submitReview} style={[styles.reviewConfirmButton]}>
        <View>
          <Text style={[styles.reviewConfirmButtonText]}>리뷰 등록</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 16,
  },
  reviewContainer: {
    alignItems: 'center',
    width: '100%',
  },
  storeName: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  childView: {marginTop: 8, marginBottom: 8},
  reviewConfirmButton: {
    width: '100%',
    height: 56,
    borderRadius: 10,
    backgroundColor: '#6C69FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'android' && 16,
  },
  reviewConfirmButtonText: {
    color: '#FFFFFF',
  },
  reviewContent: {
    width: '100%',
    height: 164,
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  ImageSelectContainer: {
    width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  imageAddButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    marginRight: 8,
  },
  rateReviewText: {
    marginBottom: 14,
    color: '#616161',
  },
});
