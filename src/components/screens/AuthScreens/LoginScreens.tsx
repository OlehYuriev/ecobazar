import { FC, useState } from "react";
import styles from "./LoginScreens.module.scss";
import InputComponent from "@/components/ui/input/InputComponent";
import ButtonMain from "@/components/ui/buttons/ButtonMain";
import { Link, useNavigate } from "react-router-dom";
import CheckboxComponent from "@/components/ui/input/CheckboxComponent";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/firebase";
import { FirebaseError } from "firebase/app";

const LoginScreens: FC = () => {
  const navigate = useNavigate();
  const [logIn, setLogIn] = useState({ email: "", password: "" });
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("Invalid email address or password.");
    } else {
      setErrorMessage("An error occurred while logging in. Please try again.");
    }
  }
  function authLogin(userCredential: UserCredential) {
    userCredential.user;
    setLogIn({ email: "", password: "" });
    setErrorMessage("");
    navigate("/account");
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
  return (
    <>
      <div className={styles.containerLogin}>
        <div className={styles.login}>
          <h1 className="text-3xl font-semibold text-center">Sign In</h1>
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
              placeholder="Password"
              typePassword={true}
              autoComplete="current-password"
            />
            <div className="flex justify-between items-center">
              {" "}
              <CheckboxComponent
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                label="Remember me"
              />
              <p className="text-gray-scale-gray-600">Forget Password</p>
            </div>
            <ButtonMain
              value="Login"
              type="submit"
              disabled={!logIn.email || !logIn.password}
            />
          </form>
          {errorMessage && <p className=" text-red-600 mt-3">{errorMessage}</p>}
          <div className="text-gray-scale-gray-600 text-center mt-5">
            Don’t have account?{" "}
            <Link
              to={"/register"}
              className="text-gray-scale-gray-900 font-medium hover:text-branding-success transition-all"
            >
              {" "}
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreens;
