import { useAppDispatch } from "@store/hooks";
import { useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetProducts, cleanProducts } from "@store/products/productsSlice";
import { useParams } from "react-router-dom";

export const useProducts = () => {
  const params = useParams();
  const productPrefix = params.prefix;
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const { items } = useAppSelector((state) => state.cart);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: items[el.id] || 0,
    isLiked: wishListItemsId.includes(el.id),
    isAuthenticated: userAccessToken ? true : false,
  }));

  useEffect(() => {
    const promise = dispatch(actGetProducts(params.prefix as string));

    return () => {
      promise.abort();
      dispatch(cleanProducts());
    };
  }, [dispatch, params.prefix]);
  return { loading, error, records, productsFullInfo, productPrefix };
};
