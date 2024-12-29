import { Container } from "react-bootstrap";
import { Product } from "@components/wearly";
import { useAppDispatch } from "@store/hooks";
import { useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetProducts, cleanProducts } from "@store/products/productsSlice";
import { useParams } from "react-router-dom";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";

const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(actGetProducts(params.prefix as string));

    return () => {
      dispatch(cleanProducts());
    };
  }, [dispatch, params.prefix]);

  return (
    <Container>
      <Loading loading={loading} error={error}>
        <GridList
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
