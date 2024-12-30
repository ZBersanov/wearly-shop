import { Heading } from "@components/common";
import { CartItem, CartSubTotalPrice } from "@components/wearly";

const Cart = () => {
  return (
    <>
      <Heading>Корзина</Heading>
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartSubTotalPrice />
    </>
  );
};

export default Cart;
