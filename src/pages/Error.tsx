import { LottieHandler } from "@components/feedback";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Container className="notFound">
      <>
        <LottieHandler type="notFound" />
        <Link to={"/"} replace={true}>
          Кажется ты перешел на несуществующую страницу <br />
          Нажми и дуй обратно
        </Link>
      </>
    </Container>
  );
};

export default Error;
