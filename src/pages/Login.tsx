import { Heading } from "@components/common";
import { Input } from "@components/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInTypes } from "@validations/signInSchema";
import { Form, Button, Row, Col } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInTypes>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const submitHandler: SubmitHandler<SignInTypes> = (data) => console.log(data);

  return (
    <>
      <Heading>Вход</Heading>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
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
              Войти
            </Button>{" "}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
