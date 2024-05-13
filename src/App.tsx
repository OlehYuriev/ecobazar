import { RouterProvider } from "react-router-dom";
import router from "./router/router";

const App = () => {
  const poe = "sd";
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
