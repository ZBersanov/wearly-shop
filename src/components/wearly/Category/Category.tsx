import { FC } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { ICategory } from "@types";
const { category, categoryImg, categoryTitle } = styles;

const Category: FC<ICategory> = ({ img, title, prefix }) => {
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
