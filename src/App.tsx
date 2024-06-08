import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { Suspense } from "react";

const App = () => {
  return (
    <>
      <Suspense fallback="...loading">
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
