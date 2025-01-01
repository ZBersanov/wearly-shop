import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

const CategorySkeleton = () => {
  const renderSkeletons = Array(4)
    .fill(0)
    .map((_, index) => (
      <Col key={index} sx={3}>
        <ContentLoader
          speed={2}
          width={300}
          height={500}
          viewBox="0 0 300 500"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          className="d-flex justify-content-center mb-5 mt-2"
        >
          <circle cx="153" cy="96" r="94" />
          <rect x="116" y="201" rx="0" ry="0" width="69" height="18" />
        </ContentLoader>
      </Col>
    ));
  return <Row>{renderSkeletons}</Row>;
};

export default CategorySkeleton;
