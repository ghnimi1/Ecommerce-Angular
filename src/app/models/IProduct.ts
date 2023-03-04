export interface IProduct {
  _id?: string;
  productName: string;
  imgUrl: string;
  category: string;
  price: number;
  shortDesc: string;
  description: string;
  avgRating?: number;
  reviews?: IReviews[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReviews {
  userId?: string;
  rating: number;
  comment: string;
}
