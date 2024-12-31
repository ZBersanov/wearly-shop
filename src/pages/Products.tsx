import { Container } from "react-bootstrap";
import { Product } from "@components/wearly";
import { useAppDispatch } from "@store/hooks";
import { useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetProducts, cleanProducts } from "@store/products/productsSlice";
import { useParams } from "react-router-dom";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";

const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const { items } = useAppSelector((state) => state.cart);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);

  useEffect(() => {
    dispatch(actGetProducts(params.prefix as string));
    console.log(params.prefix);

    return () => {
      dispatch(cleanProducts());
    };
  }, [dispatch, params.prefix]);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: items[el.id] || 0,
    isLiked: wishListItemsId.includes(el.id),
  }));

  return (
    <Container>
      <Heading>Товары</Heading>
      <Loading loading={loading} error={error}>
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
