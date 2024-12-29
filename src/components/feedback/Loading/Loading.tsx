import React from "react";
import { TLoading } from "@customTypes/shared";
import { FC } from "react";

interface LoadingProps {
  loading: TLoading;
  error: null | string;
  children: React.ReactNode;
}

const Loading: FC<LoadingProps> = ({ loading, error, children }) => {
  if (loading === "pending") {
    return <p>...Идет загрузка пожалуйста подождите</p>;
  }

  if (loading === "rejected") {
    return <p>{error}</p>;
  }

  return <div>{children}</div>;
};

export default Loading;
