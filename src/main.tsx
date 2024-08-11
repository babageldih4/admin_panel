import ReactDOM from "react-dom/client";
import "../src/styles/variables.scss";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./routes/RouteList.tsx";
// import ProductsModal from "./components/ProductsModal.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <RouteList />
      {/* <ProductsModal /> */}
    </BrowserRouter>
  </Provider>
);
