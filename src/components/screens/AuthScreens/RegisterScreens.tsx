import { FC, useState } from "react";
import styles from "./LoginScreens.module.scss";
import InputComponent from "@/components/ui/input/InputComponent";
import ButtonMain from "@/components/ui/buttons/ButtonMain";
import { Link, useNavigate } from "react-router-dom";
import CheckboxComponent from "@/components/ui/input/CheckboxComponent";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useTranslation } from "react-i18next";

const RegisterScreens: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [register, setRegister] = useState({ email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleEmailChange = (newValue: string) => {
    setRegister((prevState) => ({
      ...prevState,
      email: newValue,
    }));
  };
  const handlePasswordChange = (newValue: string) => {
    setRegister((prevState) => ({
      ...prevState,
      password: newValue,
    }));
  };
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (register.email && register.password === confirmPassword && isChecked) {
      createUserWithEmailAndPassword(auth, register.email, register.password)
        .then(() => {
          setRegister({ email: "", password: "" });
          setConfirmPassword("");
          setErrorMessage("");
          navigate("/account/setting");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setErrorMessage("This email address is already in use.");
          } else {
            setErrorMessage(
              "An error occurred during registration. Please try again."
            );
          }
        });
    } else if (register.password !== confirmPassword) {
      setErrorMessage("Passwords must be the same");
    }
  }

  return (
    <>
      <div className={styles.containerLogin}>
        <div className={styles.login}>
          <h1 className="text-3xl font-semibold text-center">
            {t("CreateAccount")}
          </h1>
          <form action="" onSubmit={submit} className={styles.form}>
            <InputComponent
              value={register.email}
              setValue={handleEmailChange}
              placeholder="Email"
              autoComplete="email"
              type="email"
            />
            <InputComponent
              value={register.password}
              setValue={handlePasswordChange}
              placeholder={t("account.Password")}
              typePassword={true}
              autoComplete="current-password"
            />{" "}
            <InputComponent
              value={confirmPassword}
              setValue={setConfirmPassword}
              placeholder={t("account.ConfirmPassword")}
              typePassword={true}
              autoComplete="confirm-password"
            />
            <CheckboxComponent
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              label={t("AcceptConditions")}
            />
            <ButtonMain
              value={t("CreateAccount")}
              type="submit"
              disabled={
                !register.email ||
                !register.password ||
                !confirmPassword ||
                !isChecked
              }
            />
          </form>
          {errorMessage && <p className=" text-red-600 mt-3">{errorMessage}</p>}
          <div className="text-gray-scale-gray-600 text-center mt-5">
            {t("AlreadyHaveAccount")}{" "}
            <Link
              to={"/login"}
              className="text-gray-scale-gray-900 font-semibold hover:text-branding-success transition-all"
            >
              {" "}
              {t("header.SignIn")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterScreens;
