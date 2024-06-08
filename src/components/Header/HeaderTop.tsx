import { FC, useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import { setCurrency } from "@/store/currency/currencySlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslation } from "react-i18next";
import DropMenu from "../DropMenu/DropMenu";

const HeaderTop: FC = () => {
  const currency = useSelector((state: RootState) => state.currency.currency);
  const authUser = useAuth();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("Eng");

  useEffect(() => {
    if (i18n.language === "ua") {
      setLanguage("Ua");
    } else {
      setLanguage("Eng");
    }
  }, [i18n.language, language]);

  const changeLanguage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent === "Ukrainian") {
      i18n.changeLanguage("ua");
    } else {
      i18n.changeLanguage("en");
    }
  };

  function changeCurrency(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget.textContent === "UAH") {
      dispatch(setCurrency("UAH"));
    } else {
      dispatch(setCurrency("USD"));
    }
  }
  return (
    <>
      <div className="py-3 bg-gray-scale-gray-800">
        <div className="container">
          <div className="text-gray-scale-gray-400 flex text-xs items-center justify-between">
            <a
              href="https://www.google.com.ua/maps/search/Lincoln-+344,+Illinois,+Chicago,+USA/@41.846882,-87.7413803,11z?hl=ru&entry=ttu"
              className="flex items-center"
            >
              <CiLocationOn className="fill-gray" fontSize="1.25rem" />
              <span className="ml-2">{t("header.address")}</span>
            </a>
            <div className="flex gap-x-5">
              <DropMenu
                value={language}
                buttons={[t("languages.english"), t("languages.ukrainian")]}
                changeValue={changeLanguage}
              />
              <DropMenu
                value={currency}
                buttons={["USD", "UAH"]}
                changeValue={changeCurrency}
              />

              <div className="border-l-2 border-gray-scale-gray-600 pl-5">
                {authUser ? (
                  <Link to="/account">
                    <FaUser fontSize={"1rem"} />
                  </Link>
                ) : (
                  <>
                    <Link to="/login">{t("header.SignIn")}</Link> /{" "}
                    <Link to="/register">{t("header.SignUp")}</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderTop;
