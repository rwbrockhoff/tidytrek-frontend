import ReactDOM from "react-dom/client";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppWithRoutes from "./AppWithRoutes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <AppWithRoutes />
    </Provider>
  </>
);
