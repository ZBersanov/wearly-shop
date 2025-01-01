import { Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { CartItemlist, CartSubTotalPrice } from "@components/wearly";
import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cleanFullProductInfo,
  removeCartItem,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, productFullInfo } = useAppSelector(
    (state) => state.cart
  );
  useEffect(() => {
    dispatch(actGetProductsByItems());

    return () => {
      dispatch(cleanFullProductInfo());
    };
  }, [dispatch]);

  const products = productFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeCartItemHandler = useCallback(
    (id: number) => {
      dispatch(removeCartItem(id));
    },
    [dispatch]
  );

  return (
    <>
      <Heading>Корзина</Heading>
      <Loading loading={loading} error={error}>
        {products.length ? (
          <>
            <CartItemlist
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeCartItemHandler={removeCartItemHandler}
            />
            <CartSubTotalPrice products={products} />
          </>
        ) : (
          <h2>Ваша корзина пуста</h2>
        )}
      </Loading>
    </>
  );
};

export default Cart;
