import { Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { CartItemlist, CartSubTotalPrice } from "@components/wearly";
import { actGetProductsByItems } from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, productFullInfo } = useAppSelector(
    (state) => state.cart
  );
  useEffect(() => {
    dispatch(actGetProductsByItems());
  }, [dispatch]);

  const products = productFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  return (
    <>
      <Heading>Корзина</Heading>
      <Loading loading={loading} error={error}>
        <CartItemlist products={products} />
        <CartSubTotalPrice />
      </Loading>
    </>
  );
};

export default Cart;
