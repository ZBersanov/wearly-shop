import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@types";
import { FC, memo, useEffect, useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import Like from "@assets/svg/like.svg?react";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import LikeFill from "@assets/svg/like-fill.svg?react";

const { product, productImg, maximumNotice, wishlistBtn } = styles;

type TProductProps = TProduct & { isLiked: boolean };

const Product: FC<TProductProps> = memo(
  ({ id, img, title, price, max, quantity, isLiked, isAuthenticated }) => {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);

    const currentRemainingQuantity = max - (quantity ?? 0);

    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

    useEffect(() => {
      if (!isBtnDisabled) return;
      setIsBtnDisabled(true);

      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };

    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      } else {
        setShowModal(true);
      }
    };

    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Вы не авторизованы</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Сначала необходимо войти в аккаунт</p>
          </Modal.Body>
        </Modal>
        <div className={product}>
          <div className={wishlistBtn} onClick={likeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <h2>{title}</h2>
          <h3>{price.toFixed(2)}</h3>
          <p className={maximumNotice}>
            {quantityReachedToMax
              ? `Вы достигли лимита`
              : `Вы можете добавить штук: ${currentRemainingQuantity} `}
          </p>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={addToCartHandler}
            disabled={isBtnDisabled || quantityReachedToMax}
          >
            {isBtnDisabled ? (
              <>
                <Spinner animation="border" size="sm" /> ...Loading
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </div>
      </>
    );
  }
);

export default Product;
