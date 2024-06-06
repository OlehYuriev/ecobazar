import { IInfoSend } from "./IInfo";
import { IProductSubtotal } from "./IProduct";

export default interface IProductOrder extends IInfoSend {
  idOrder: number;
  payment: string;
  totalPrice: string;
  dateProduct: string;
  order: {
    basketWithSubtotal: IProductSubtotal[];
  };
}
