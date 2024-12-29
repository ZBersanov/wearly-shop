import React from "react";
import { Row, Col } from "react-bootstrap";

type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
};

type HasId = { id?: number };

const GridList = <T extends HasId>({
  records,
  renderItem,
}: GridListProps<T>) => {
  const renderList =
    records.length > 0
      ? records.map((record) => (
          <Col
            xs={3}
            key={record.id}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {renderItem(record)}
          </Col>
        ))
      : "there are no records";
  return <Row>{renderList}</Row>;
};

export default GridList;
