import { FC, useState } from "react";
import styles from "./LoginScreens.module.scss";
import InputComponent from "@/components/ui/input/InputComponent";
import ButtonMain from "@/components/ui/buttons/ButtonMain";
import { Link, useNavigate } from "react-router-dom";
import CheckboxComponent from "@/components/ui/input/CheckboxComponent";
import {
  browserSessionPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/firebase";
import { FirebaseError } from "firebase/app";
import { useTranslation } from "react-i18next";
import AlertSuccess from "@/components/AlertSuccess/AlertSuccess";

const LoginScreens: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [logIn, setLogIn] = useState({ email: "", password: "" });
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleEmailChange = (newValue: string) => {
    setLogIn((prevState) => ({
      ...prevState,
      email: newValue,
    }));
  };
  const handlePasswordChange = (newValue: string) => {
    setLogIn((prevState) => ({
      ...prevState,
      password: newValue,
    }));
  };

  function errorText(error: FirebaseError) {
    if (error.code === "auth/invalid-credential") {
      setErrorMessage(t("Errors.InvalidEmailPassword"));
    } else {
      setErrorMessage(t("Errors.AnErrorLoggingIn"));
    }
  }
  function authLogin(userCredential: UserCredential) {
    userCredential.user;
    setLogIn({ email: "", password: "" });
    setErrorMessage("");
    navigate("/account/setting");
  }
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (logIn.email && logIn.password) {
      if (isChecked) {
        // Сохранение сеанса аутентификации при помощи метода setPersistence с аргументом 'local'
        signInWithEmailAndPassword(auth, logIn.email, logIn.password)
          .then((userCredential) => {
            authLogin(userCredential);
          })
          .catch((error) => {
            errorText(error);
          });
      } else {
        // Аутентификация пользователя без сохранения сеанса

        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            return signInWithEmailAndPassword(
              auth,
              logIn.email,
              logIn.password
            );
          })
          .then((userCredential) => {
            authLogin(userCredential);
          })
          .catch((error) => {
            errorText(error);
          });
      }
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, logIn.email);
      setShowAlert(true);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setErrorMessage(t("Errors.cannotFindEmail"));
    }
  };
  return (
    <>
      <div className={styles.containerLogin}>
        <div className={styles.login}>
          <h1 className="text-3xl font-semibold text-center">
            {t("header.SignIn")}
          </h1>
          <form action="" onSubmit={(e) => submit(e)} className={styles.form}>
            <InputComponent
              value={logIn.email}
              setValue={handleEmailChange}
              placeholder="Email"
              autoComplete="email"
            />
            <InputComponent
              value={logIn.password}
              setValue={handlePasswordChange}
              placeholder={t("account.Password")}
              typePassword={true}
              autoComplete="current-password"
            />
            <div className="flex justify-between items-center">
              {" "}
              <CheckboxComponent
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                label={t("RememberMe")}
              />
              <button
                type="button"
                className="text-gray-scale-gray-600 hover:text-branding-warning transition-all"
                onClick={handleSubmit}
              >
                {t("ForgetPassword")}
              </button>
            </div>
            <ButtonMain
              value="Login"
              type="submit"
              disabled={!logIn.email || !logIn.password}
            />
          </form>
          {errorMessage && <p className=" text-red-600 mt-3">{errorMessage}</p>}
          <div className="text-gray-scale-gray-600 text-center mt-5">
            {t("HaveAccount")}{" "}
            <Link
              to={"/register"}
              className="text-gray-scale-gray-900 font-semibold hover:text-branding-success transition-all"
            >
              {t("header.SignUp")}
            </Link>
          </div>
        </div>
      </div>
      <AlertSuccess
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={t("letterSentEmail")}
      />
    </>
  );
};

export default LoginScreens;
