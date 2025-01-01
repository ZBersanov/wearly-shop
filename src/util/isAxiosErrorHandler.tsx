import { isAxiosError } from "axios";

const isAxiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    return error.response?.data.message || error.message;
  } else {
    return "Произошла непредвиденная ошибка";
  }
};

export default isAxiosErrorHandler;
