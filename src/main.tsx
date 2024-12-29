import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

//redux
import store from "@store/index";
import { Provider } from "react-redux";
//styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";

import AppRouter from "@routes/AppRouter";

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
