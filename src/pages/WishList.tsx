import { GridList, Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { Product } from "@components/wearly";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, cleanWishlist } from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

const WishList = () => {
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
  return (
    <>
      <Heading>Избранное</Heading>
      <Loading loading={loading} error={error}>
        <GridList
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default WishList;
