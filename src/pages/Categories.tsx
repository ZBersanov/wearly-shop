import { Container } from "react-bootstrap";
import { Category } from "@components/wearly";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { FC, useEffect } from "react";
import {
  actGetCategories,
  cleanCategories,
} from "@store/categories/categoriesSlice";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";

const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(actGetCategories());

    return () => {
      dispatch(cleanCategories());
    };
  }, [dispatch]);

  return (
    <Container>
      <Heading>Категории</Heading>
      <Loading loading={loading} error={error}>
        <GridList
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
