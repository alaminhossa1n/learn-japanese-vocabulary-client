import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
        <Toaster />
    <RouterProvider router={router} />
  </Provider>
);
