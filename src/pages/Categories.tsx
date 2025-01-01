import { Container } from "react-bootstrap";
import { Category } from "@components/wearly";

import { FC } from "react";

import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { useCategories } from "@hooks/useCategories";

const Categories: FC = () => {
  const { loading, error, records } = useCategories();

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
