// import { useAppSelector } from "@store/hooks";
import styles from "./styles.module.css";
import WishIcon from "@assets/svg/wishlist.svg?react";
import { useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { container, total, iconWrapper, pumpCartQuantity } = styles;

const HeaderWishList = () => {
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  const totalQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );
  const quantityStyle = `${total} ${isAnimate ? pumpCartQuantity : ""}`;

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
    <div className={container} onClick={() => navigate("/cart")}>
      <div className={iconWrapper}>
        <WishIcon title="wishlist icon" />
        {totalQuantity > 0 && (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}
      </div>
      <h3>Избранное</h3>
    </div>
  );
};

export default HeaderWishList;
