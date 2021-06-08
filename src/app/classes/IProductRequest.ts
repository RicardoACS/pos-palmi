import { IPriceRequest } from './IPriceRequest';

export interface IProductRequest {
  id: number;
  identifier: string;
  name: string;
  description: string;
  photo: string;
  state: number;
  subCategoryId: number;
  price: IPriceRequest;
}
