import { Heading } from "@components/common";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { Input } from "@components/Form";
import useRegister from "@hooks/useRegister";
import { Navigate } from "react-router-dom";

const Register = () => {
  const {
    accessToken,
    handleSubmit,
    submitHandler,
    register,
    errors,
    emailAvailabilityStatus,
    emailOnBlurHandler,
    loading,
    error,
  } = useRegister();

  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Heading>Регистрация</Heading>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Input
              label="Ваше Имя"
              name="firstName"
              register={register}
              error={errors.firstName?.message}
            />
            <Input
              label="Ваша Фамилия"
              name="lastName"
              register={register}
              error={errors.lastName?.message}
            />
            <Input
              label="Ваша электронная почта"
              name="email"
              register={register}
              error={
                errors.email?.message
                  ? errors.email?.message
                  : emailAvailabilityStatus === "notAvailable"
                  ? "Эта почта уже используется"
                  : emailAvailabilityStatus === "failed"
                  ? "Ошибка сервера"
                  : ""
              }
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailabilityStatus === "checking"
                  ? "Идет проверка доступности email"
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "Ваш email доступен"
                  : ""
              }
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            />
            <Input
              label="Придумайте пароль"
              type="password"
              name="password"
              register={register}
              error={errors.password?.message}
            />
            <Input
              label="Подтвердите пароль"
              type="password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword?.message}
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabilityStatus === "checking"
                  ? true
                  : // eslint-disable-next-line no-constant-binary-expression
                    false || loading === "pending"
              }
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Загрузка...
                </>
              ) : (
                "Зарегистрироваться"
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

export default Register;
