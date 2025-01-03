import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpTypes } from "@validations/signUpSchema";

const useRegister = () => {
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
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

  const submitHandler: SubmitHandler<SignUpTypes> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => navigate("/login?message=account_created"));
  };

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

  return {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    errors,
    submitHandler,
    emailOnBlurHandler,
    emailAvailabilityStatus,
  };
};

export default useRegister;
