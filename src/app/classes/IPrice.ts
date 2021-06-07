import { IProduct } from "./IProduct";

export interface IPrice {
    value: number,
    state: number
    product: IProduct
}