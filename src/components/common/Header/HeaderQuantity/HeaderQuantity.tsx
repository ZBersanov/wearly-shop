//hooks
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//styles
import styles from "./styles.module.css";

type HeaderQuantityProps = {
  totalQuantity: number;
  svgIcon: React.ReactNode;
  title: string;
  path: string;
};

const { basketContainer, basketQuantity, basketCart, pumpCartQuantity } =
  styles;

const HeaderQuantity: FC<HeaderQuantityProps> = ({
  totalQuantity,
  svgIcon,
  title,
  path,
}) => {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  const quantityStyle = `${basketQuantity} ${
    isAnimate ? pumpCartQuantity : ""
  }`;

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
    <div className={basketContainer} onClick={() => navigate(path)}>
      <div className={basketCart}>
        {svgIcon}
        <div className={quantityStyle}>{totalQuantity}</div>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default HeaderQuantity;
