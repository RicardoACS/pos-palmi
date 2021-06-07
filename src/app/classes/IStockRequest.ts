import { IBuyRequest } from "./IBuyRequest";

export interface IStockRequest {
    buy: IBuyRequest;
    quantity: number;
    productId: number;
}