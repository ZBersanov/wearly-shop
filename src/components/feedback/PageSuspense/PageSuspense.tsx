import { Suspense } from "react";
import LottieHandler from "../LottieHandler/LottieHandler";

const PageSuspense = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={<LottieHandler type="loading" message="Идет загрузка" />}
    >
      {children}
    </Suspense>
  );
};

export default PageSuspense;
