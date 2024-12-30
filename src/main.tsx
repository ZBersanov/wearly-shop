import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

//redux
import { store, persistor } from "@store/index";
import { Provider } from "react-redux";
//axios
import "@services/axios-global";
//styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";

import AppRouter from "@routes/AppRouter";
import { PersistGate } from "redux-persist/integration/react";

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
