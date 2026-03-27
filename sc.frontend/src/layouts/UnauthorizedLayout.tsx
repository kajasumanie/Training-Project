import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer/Footer";
import Loader from "../shared/Loader/Loader";

const UnauthorizedLayout = () => {
  return (
    <div>
      <Suspense fallback={<Loader/>}>
        <Outlet />
        <Footer />
      </Suspense>
    </div>
  );
};

export default UnauthorizedLayout;
