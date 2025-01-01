import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, cleanWishlist } from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist
  );
  const { items } = useAppSelector((state) => state.cart);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);

  useEffect(() => {
    dispatch(actGetWishlist());

    return () => {
      dispatch(cleanWishlist());
    };
  }, [dispatch]);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id] || 0,
    isLiked: wishListItemsId.includes(el.id),
  }));

  return { loading, error, records };
};
