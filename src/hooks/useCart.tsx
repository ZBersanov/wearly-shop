import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cleanFullProductInfo,
  removeCartItem,
} from "@store/cart/cartSlice";
import { resetOrderStatus } from "@store/orders/ordersSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, productFullInfo } = useAppSelector(
    (state) => state.cart
  );

  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const placeOrderStatus = useAppSelector((state) => state.orders.loading);

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());

    return () => {
      promise.abort();
      dispatch(cleanFullProductInfo());
      dispatch(resetOrderStatus());
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
  return {
    loading,
    error,
    products,
    changeQuantityHandler,
    removeCartItemHandler,
    userAccessToken,
    placeOrderStatus,
  };
};
