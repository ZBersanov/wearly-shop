import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { IProduct } from "@customTypes/products";
import { FC } from "react";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";

const { product, productImg } = styles;

const Product: FC<IProduct> = ({ id, img, title, price }) => {
  const dispatch = useAppDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(id));
  };

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={addToCartHandler}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default Product;
