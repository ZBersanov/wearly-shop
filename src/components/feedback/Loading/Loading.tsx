import React from "react";
import { TLoading } from "@types";
import { FC } from "react";
import CategorySkeleton from "../Skeletons/CategorySkeleton";
import CartSkeleton from "../Skeletons/CartSkeleton";
import ProductSkeleton from "../Skeletons/ProductSkeleton";

interface LoadingProps {
  loading: TLoading;
  error: null | string;
  children: React.ReactNode;
  type: "cart" | "category" | "product";
}

const skeletons = {
  cart: CartSkeleton,
  category: CategorySkeleton,
  product: ProductSkeleton,
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
    return <p>{error}</p>;
  }

  return <div>{children}</div>;
};

export default Loading;
