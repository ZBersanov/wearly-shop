import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@types";
import { FC, memo } from "react";
import ProductInfo from "../ProductInfo/ProductInfo";

const { cartItem, cartItemSelection } = styles;

type TCartItemProps = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeCartItemHandler: (id: number) => void;
};

const CartItem: FC<TCartItemProps> = memo(
  ({
    id,
    img,
    title,
    price,
    max,
    quantity,
    changeQuantityHandler,
    removeCartItemHandler,
  }) => {
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

    const changeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +e.target.value;
      changeQuantityHandler(id, quantity);
    };

    return (
      <div className={cartItem}>
        <ProductInfo title={title} price={price} img={img} direction="column">
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
            onClick={() => removeCartItemHandler(id)}
          >
            Remove
          </Button>
        </ProductInfo>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Количество</span>
          <Form.Select onChange={changeQuantity} value={quantity}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
