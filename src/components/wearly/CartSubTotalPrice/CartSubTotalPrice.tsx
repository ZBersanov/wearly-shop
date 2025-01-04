import { TProduct } from "@types";
import styles from "./styles.module.css";
import { FC, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useAppDispatch } from "@store/hooks";
import { actPlaceOrder } from "@store/orders/ordersSlice";
import { clearCartAfterPlaceOrder } from "@store/cart/cartSlice";

const { container } = styles;

type TCartSubTotalPriceProps = {
  products: TProduct[];
  userAccessToken: string | null;
};

const CartSubTotalPrice: FC<TCartSubTotalPriceProps> = ({
  products,
  userAccessToken,
}) => {
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const totalPrice = products.reduce((accumulator, product) => {
    if (product.quantity && typeof product.quantity === "number") {
      return accumulator + product.price * product.quantity;
    } else {
      return accumulator;
    }
  }, 0);

  const handleClose = () => {
    setShow(!show);
    setError(null);
  };

  const placeOrderHandler = async () => {
    setLoading(true);
    dispatch(actPlaceOrder(totalPrice))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterPlaceOrder());
        setShow(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Оформление заказа</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы уверены что хотите оформить заказ на сумму {totalPrice.toFixed(2)}{" "}
          RUB
          {!loading && error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={placeOrderHandler}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Загрузка...
              </>
            ) : (
              "Заказать"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={container}>
        <span>Итого к оплате:</span>
        <span>{totalPrice.toFixed(2)} RUB</span>
      </div>
      {userAccessToken && (
        <div className={container}>
          <span></span>
          <Button onClick={handleClose}>Заказать</Button>
        </div>
      )}
    </>
  );
};

export default CartSubTotalPrice;
