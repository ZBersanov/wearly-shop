import styles from "./styles.module.css";

const { container } = styles;

const CartSubTotalPrice = () => {
  return (
    <div className={container}>
      <span>Subtotal:</span>
      <span>2000 RUB</span>
    </div>
  );
};

export default CartSubTotalPrice;
