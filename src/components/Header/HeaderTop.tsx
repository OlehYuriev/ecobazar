import { FC } from "react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
const HeaderTop: FC = () => {
  const authUser = useAuth();
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
    </>
  );
};

export default HeaderTop;
