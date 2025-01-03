import { Heading } from "@components/common";
import { Form, Button, Row, Col } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpTypes } from "@validations/signUpSchema";
import { Input } from "@components/Form";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";

const Register = () => {
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<SignUpTypes>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const submitHandler: SubmitHandler<SignUpTypes> = (data) => console.log(data);

  const {
    checkEmailAvailability,
    resetCheckEmailAvailability,
    emailAvailabilityStatus,
    enteredEmail,
  } = useCheckEmailAvailability();

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };

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
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            >
              Зарегистрироваться
            </Button>{" "}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
