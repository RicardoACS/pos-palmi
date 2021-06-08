export interface IBuyRequest {
  id: number;
  buyDate: Date;
  invoiceNumber: number;
  price: number;
  supplierId: number;
  channelId: number;
}
