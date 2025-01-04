import { FC } from "react";
import styles from "./styles.module.css";

type ProductInfoProps = {
  title: string;
  img: string;
  price: number;
  direction?: "row" | "column";
  children?: React.ReactNode;
  style?: React.CSSProperties;
  quantity?: number;
};

const ProductInfo: FC<ProductInfoProps> = ({
  title,
  img,
  price,
  direction = "row",
  quantity,
  children,
  style,
}) => {
  return (
    <div className={`${styles[`product-${direction}`]}`} style={style}>
      <div className={`${styles[`productImg-${direction}`]}`}>
        <img src={img} alt="" />
      </div>
      <div className={`${styles[`productInfo-${direction}`]}`}>
        <h2>{title}</h2>
        <h3>{price.toFixed(2)} RUB</h3>
        {quantity && <h3>Количество: {quantity}</h3>}
        {quantity && <h3>Общая цена: {(quantity * price).toFixed(2)}</h3>}
        {children}
      </div>
    </div>
  );
};

export default ProductInfo;
