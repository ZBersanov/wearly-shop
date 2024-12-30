import { IProduct } from "@customTypes/products";
import CartItem from "../CartItem/CartItem";
import { FC } from "react";

type TCartItemListProps = { products: IProduct[] };

const CartItemlist: FC<TCartItemListProps> = ({ products }) => {
  const renderList = products.map((el) => <CartItem key={el.id} {...el} />);
  return <div>{renderList}</div>;
};

export default CartItemlist;
