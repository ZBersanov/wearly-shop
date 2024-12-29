import { useAppSelector } from "@store/hooks";
import styles from "./styles.module.css";
import Logo from "@assets/svg/cart.svg?react";
import { getCartTotalQuantitySelector } from "@store/cart/selectors";

const { basketContainer, basketQuantity } = styles;

const HeaderBasket = () => {
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);

  console.log(totalQuantity);

  return (
    <div className={basketContainer}>
      <Logo title="basket icon" />
      <div className={basketQuantity}>{totalQuantity}</div>
    </div>
  );
};

export default HeaderBasket;
