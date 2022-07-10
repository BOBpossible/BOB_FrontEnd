export type IStoreMap = {
  addressDetail: string;
  addressStreet: string;
  category: string;
  distance: number;
  imageUrl: string;
  mission: boolean;
  name: string;
  point: number;
  storeId: number;
  userX: number;
  userY: number;
};

export type IStoreData = {
  address: {
    detail: string;
    dong: string;
    street: string;
    x: number;
    y: number;
  };
  averageRate: number;
  category: string;
  images: {imageUrl: string}[];
  name: string;
  reviewCount: number;
  storeId: number;
  storeStatus: string;
};

export type IStoreReviewImages = {
  content: {imageUrl: string; reviewId: number}[];
  last: boolean;
};
