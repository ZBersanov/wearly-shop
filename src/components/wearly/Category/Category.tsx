import { FC } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { TCategory } from "@types";
const { category, categoryImg, categoryTitle } = styles;

const Category: FC<TCategory> = ({ img, title, prefix }) => {
  return (
    <div className={category}>
      <Link to={`/categories/products/${prefix}`}>
        <div className={categoryImg}>
          <img src={img} alt="" />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
};

export default Category;
