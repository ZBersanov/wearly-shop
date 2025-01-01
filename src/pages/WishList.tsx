import { GridList, Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { Product } from "@components/wearly";
import { useWishlist } from "@hooks/useWishlist";

const WishList = () => {
  const { loading, error, records } = useWishlist();

  return (
    <>
      <Heading>Избранное</Heading>
      <Loading loading={loading} error={error} type="product">
        <GridList
          records={records}
          renderItem={(record) => <Product {...record} />}
          emptyMessage="Нет избранных"
        />
      </Loading>
    </>
  );
};

export default WishList;
