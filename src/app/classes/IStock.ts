import { IBuy } from "./IBuy";
import { IBuyRequest } from "./IBuyRequest";
import { IProduct } from "./IProduct";

export interface IStock {
    id: number;
    quantity: number;
    buy: IBuy;
    product: IProduct;
}