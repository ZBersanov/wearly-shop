import { useAppSelector } from "@store/hooks";
import styles from "./styles.module.css";
import Logo from "@assets/svg/cart.svg?react";
import { getCartTotalQuantitySelector } from "@store/cart/selectors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { basketContainer, basketQuantity, basketCart, pumpCartQuantity } =
  styles;

const HeaderBasket = () => {
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
  const quantityStyle = `${basketQuantity} ${
    isAnimate ? pumpCartQuantity : ""
  }`;

  console.log(totalQuantity);

  const navigate = useNavigate();

  useEffect(() => {
    if (!totalQuantity) return;

    setIsAnimate(true);

    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => {
      clearTimeout(debounce);
    };
  }, [totalQuantity]);

  return (
    <div className={basketContainer} onClick={() => navigate("/cart")}>
      <div className={basketCart}>
        <Logo title="basket icon" />
        <div className={quantityStyle}>{totalQuantity}</div>
      </div>
      <h3>Cart</h3>
    </div>
  );
};

export default HeaderBasket;
