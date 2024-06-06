import { FC } from "react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./Header.module.scss";
import { setCurrency } from "@/store/currency/currencySlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";

const HeaderTop: FC = () => {
  const currency = useSelector((state: RootState) => state.currency.currency);
  const authUser = useAuth();
  const dispatch = useDispatch();
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
              <span className="ml-2">
                Store Location: Lincoln- 344, Illinois, Chicago, USA
              </span>
            </a>
            <div className="flex gap-x-5">
              <div className={styles.dropMenu}>
                <div className="flex items-center gap-x-1 cursor-pointer">
                  <span>{currency}</span>{" "}
                  <span className={styles.dropMenu__icon}>
                    <IoIosArrowDown />
                  </span>
                </div>
                <div className={styles.dropMenu__list}>
                  <button onClick={() => dispatch(setCurrency("USD"))}>
                    USD
                  </button>
                  <div onClick={() => dispatch(setCurrency("UAH"))}>UAH</div>
                </div>
              </div>
              <div className="border-l-2 border-gray-scale-gray-600 pl-5">
                {authUser ? (
                  <Link to="/account">
                    <FaUser fontSize={"1rem"} />
                  </Link>
                ) : (
                  <>
                    <Link to="/login">Sign In</Link> /{" "}
                    <Link to="/register">Sign Up</Link>
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
