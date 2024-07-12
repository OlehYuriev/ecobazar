import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { Suspense } from "react";
import LoaderComponent from "./components/ui/loader/LoaderComponent";

const App = () => {
  return (
    <>
      <Suspense fallback={<LoaderComponent />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
