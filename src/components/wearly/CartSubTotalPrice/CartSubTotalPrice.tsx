import { IProduct } from "@customTypes/products";
import styles from "./styles.module.css";
import { FC } from "react";

const { container } = styles;

type TCartSubTotalPriceProps = {
  products: IProduct[];
};

const CartSubTotalPrice: FC<TCartSubTotalPriceProps> = ({ products }) => {
  const totalPrice = products.reduce((accumulator, product) => {
    if (product.quantity && typeof product.quantity === "number") {
      return accumulator + product.price * product.quantity;
    } else {
      return accumulator;
    }
  }, 0);
  return (
    <div className={container}>
      <span>Subtotal:</span>
      <span>{totalPrice.toFixed(2)} RUB</span>
    </div>
  );
};

export default CartSubTotalPrice;
