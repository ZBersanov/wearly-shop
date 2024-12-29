import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { IProducts } from "@customTypes/products";
import { FC } from "react";

const { product, productImg } = styles;

const Product: FC<IProducts> = ({ img, title, price }) => {
  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
      <Button variant="info" style={{ color: "white" }}>
        Add to cart
      </Button>
    </div>
  );
};

export default Product;
