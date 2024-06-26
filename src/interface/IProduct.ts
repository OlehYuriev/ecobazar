export default interface IProduct {
  name: string;
  price: number;
  img: string[];
  category: string;
  sale?: number;
  quantity: number;
  description: string;
}

export interface IProductSubtotal extends Omit<IProduct, "price"> {
  subtotal: string;
  price: string;
}
