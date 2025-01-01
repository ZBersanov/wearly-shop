import { TProduct } from "@types";
import styles from "./styles.module.css";
import { FC } from "react";

const { container } = styles;

type TCartSubTotalPriceProps = {
  products: TProduct[];
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
      <span>Итого к оплате:</span>
      <span>{totalPrice.toFixed(2)} RUB</span>
    </div>
  );
};

export default CartSubTotalPrice;
