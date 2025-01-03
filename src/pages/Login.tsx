import { Heading } from "@components/common";
import { Input } from "@components/Form";
import useLogin from "@hooks/useLogin";

import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const Login = () => {
  const {
    accessToken,
    searchParams,
    handleSubmit,
    register,
    errors,
    submitHandler,
    loading,
    error,
  } = useLogin();

  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Heading>Вход</Heading>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") === "login_required" && (
            <Alert variant="danger">Необходимо войти</Alert>
          )}
          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">
              Аккаунт успешно создан, пожалуйста войдите
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Input
              label="Электронная почта"
              name="email"
              register={register}
              error={errors.email?.message}
            />
            <Input
              label="Пароль"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
            />
            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Загрузка...
                </>
              ) : (
                "Войти"
              )}
            </Button>
            {error && (
              <p style={{ color: "red", marginTop: "30px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
