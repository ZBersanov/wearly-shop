import HeaderQuantity from "../HeaderQuantity/HeaderQuantity";
import { useAppSelector } from "@store/hooks";
import { getCartTotalQuantitySelector } from "@store/cart/selectors";

import WishListIcon from "@assets/svg/wishlist.svg?react";
import CartIcon from "@assets/svg/cart.svg?react";
//styles
import styles from "./styles.module.css";

const { headerLeftBar } = styles;

const HeaderLeftBar = () => {
  const cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );
  return (
    <div className={headerLeftBar}>
      <HeaderQuantity
        totalQuantity={wishlistTotalQuantity}
        title="Избранное"
        path="/wishlist"
        svgIcon={<WishListIcon />}
      />
      <HeaderQuantity
        totalQuantity={cartTotalQuantity}
        title="Корзина"
        path="/cart"
        svgIcon={<CartIcon />}
      />
    </div>
  );
};

export default HeaderLeftBar;
