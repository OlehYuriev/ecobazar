import { FC } from "react";
import HeaderComponent from "../Header/HeaderComponent";
import { Link, Outlet } from "react-router-dom";
import AccountNavigation from "../AccountNavigation/AccountNavigation";
import useAuth from "@/hooks/useAuth";
import styles from "./layout.module.scss";
import FooterComponent from "../footer/FooterComponent";

const LayoutAccount: FC = () => {
  const authUser = useAuth();
  return (
    <>
      <HeaderComponent />
      <main className="container">
        {authUser ? (
          <div className={styles.account}>
            <AccountNavigation />
            <Outlet />
          </div>
        ) : (
          <div className={styles.link}>
            <Link
              to="/login"
              className="font-semibold text-2xl hover:text-branding-success transition-all"
            >
              login to your account
            </Link>
          </div>
        )}
      </main>
      <FooterComponent />
    </>
  );
};

export default LayoutAccount;
