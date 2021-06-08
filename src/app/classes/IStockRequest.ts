import { IBuyRequest } from './IBuyRequest';

export interface IStockRequest {
  id: number;
  buy: IBuyRequest;
  quantity: number;
  productId: number;
}
