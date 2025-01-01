import Lottie from "lottie-react";
import notFound from "@assets/lottieFiles/notFound.json";
import loading from "@assets/lottieFiles/loading.json";
import empty from "@assets/lottieFiles/empty.json";
import error from "@assets/lottieFiles/error.json";
import { FC } from "react";

const lottieFiles = { notFound, loading, error, empty };

type TLottieHandlerProps = {
  type: keyof typeof lottieFiles;
  message?: string;
  className?: string;
};

const LottieHandler: FC<TLottieHandlerProps> = ({
  type,
  message,
  className,
}) => {
  const lottie = lottieFiles[type];
  const messageStyle =
    type === "error"
      ? { fontSize: "19px", color: "red" }
      : { fontSize: "19px", marginBottom: "30px" };
  return (
    <div className={`d-flex flex-column align-items-center mt-4 ${className}`}>
      <Lottie animationData={lottie} style={{ width: "300px" }} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
