export type IReviewImagesType = {
  imageUrl: string;
};
export type IReviewReplyType = {
  date: string;
  reply: string;
  reviewReplyId: number;
};
export type IMyReviewEachProps = {
  content: string;
  date: string;
  images: IReviewImagesType[];
  name: string;
  rate: number;
  reply: IReviewImagesType[];
  reviewId: number;
};
export type IReviewsType = {
  content: string;
  date: string;
  images: IReviewImagesType[];
  name: string;
  rate: number;
  reply: IReviewReplyType[];
  reviewId: number;
};
