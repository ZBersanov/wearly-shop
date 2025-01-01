import { Container } from "react-bootstrap";
import { Product } from "@components/wearly";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { useProducts } from "@hooks/useProducts";

const Products = () => {
  const { loading, error, productPrefix, productsFullInfo } = useProducts();
  return (
    <Container>
      <Heading>{productPrefix?.toUpperCase()} Товары</Heading>
      <Loading loading={loading} error={error} type="product">
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
          emptyMessage="Нет товаров"
        />
      </Loading>
    </Container>
  );
};

export default Products;
