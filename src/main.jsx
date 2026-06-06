import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ReduxProvider from "./provider/ReduxProvider";
import AppMain from "./routes/AppMain";
createRoot(document.getElementById("root")).render(
  <ReduxProvider>
    <BrowserRouter>
      <AppMain />
    </BrowserRouter>
  </ReduxProvider>,
);
