import { TProduct } from "@types";
import CartItem from "../CartItem/CartItem";
import { FC } from "react";

type TCartItemListProps = {
  products: TProduct[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeCartItemHandler: (id: number) => void;
};

const CartItemlist: FC<TCartItemListProps> = ({
  products,
  changeQuantityHandler,
  removeCartItemHandler,
}) => {
  const renderList = products.map((el) => (
    <CartItem
      changeQuantityHandler={changeQuantityHandler}
      removeCartItemHandler={removeCartItemHandler}
      key={el.id}
      {...el}
    />
  ));
  return <div>{renderList}</div>;
};

export default CartItemlist;
