import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import { IProduct } from "@customTypes/products";
import { FC } from "react";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type TCartItemProps = IProduct;

const CartItem: FC<TCartItemProps> = ({ img, title, price, max, quantity }) => {
  const renderOptions = Array(max)
    .fill(0)
    .map((_, index) => {
      const quantity = ++index;
      return (
        <option value={quantity} key={quantity}>
          {quantity}
        </option>
      );
    });

  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>

        <div className={productInfo}>
          <h2>{title}</h2>
          <h3>{price.toFixed(2)} RUB</h3>
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
          >
            Remove
          </Button>
        </div>
      </div>
      <div className={cartItemSelection}>
        <span className="d-block mb-1">Количество</span>
        <Form.Select value={quantity}>{renderOptions}</Form.Select>
      </div>
    </div>
  );
};

export default CartItem;
