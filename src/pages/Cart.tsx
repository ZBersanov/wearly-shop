import { Heading } from "@components/common";
import { Loading, LottieHandler } from "@components/feedback";
import { CartItemlist, CartSubTotalPrice } from "@components/wearly";
import { useCart } from "@hooks/useCart";

const Cart = () => {
  const {
    loading,
    error,
    products,
    changeQuantityHandler,
    removeCartItemHandler,
  } = useCart();

  return (
    <>
      <Heading>Корзина</Heading>
      <Loading loading={loading} error={error} type="cart">
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
          <LottieHandler type="empty" message="Корзина пуста" />
        )}
      </Loading>
    </>
  );
};

export default Cart;
