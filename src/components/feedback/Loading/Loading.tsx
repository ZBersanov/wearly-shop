import React from "react";
import { TLoading } from "@types";
import { FC } from "react";
import CategorySkeleton from "../Skeletons/CategorySkeleton";
import CartSkeleton from "../Skeletons/CartSkeleton";
import ProductSkeleton from "../Skeletons/ProductSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";
import TableSkeleton from "../Skeletons/TableSkeleton";

interface LoadingProps {
  loading: TLoading;
  error: null | string;
  children: React.ReactNode;
  type: "cart" | "category" | "product" | "table";
}

const skeletons = {
  cart: CartSkeleton,
  category: CategorySkeleton,
  product: ProductSkeleton,
  table: TableSkeleton,
};

const Loading: FC<LoadingProps> = ({
  loading,
  error,
  children,
  type = "category",
}) => {
  const Component = skeletons[type];
  if (loading === "pending") {
    return <Component />;
  }

  if (loading === "rejected") {
    return <LottieHandler type="error" message={error as string} />;
  }

  return <div>{children}</div>;
};

export default Loading;
