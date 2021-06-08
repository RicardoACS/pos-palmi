import { SubCategory } from './SubCategory';

export interface IProduct {
  id: string;
  identifier: string;
  name: string;
  description: string;
  photo: string;
  state: number;
  createdDate: Date;
  updatedDate: Date;
  sub_category: SubCategory;
}
