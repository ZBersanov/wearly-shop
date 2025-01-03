import { zodResolver } from "@hookform/resolvers/zod";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { signInSchema, SignInTypes } from "@validations/signInSchema";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInTypes>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const submitHandler: SubmitHandler<SignInTypes> = async (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  return {
    error,
    loading,
    accessToken,
    submitHandler,
    errors,
    register,
    handleSubmit,
    searchParams,
  };
};

export default useLogin;
