import { FC, useEffect, useState } from "react";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { MdDashboard } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { RiShoppingBagLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";

const AccountNavigation: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(false);
  useEffect(() => {
    if (location.pathname.startsWith("/account/order")) {
      setActivePath(true);
    } else {
      setActivePath(false);
    }
  }, [location, activePath]);

  const links = [
    {
      url: "/account",
      name: t("links.Dashboard"),
      icon: <MdDashboard />,
      activeUrl: false,
    },
    {
      url: "/account/order",
      name: t("links.OrderHistory"),
      icon: <GrUpdate />,
      activeUrl: activePath,
    },
    {
      url: "/account/wishlist",
      name: t("Wishlist"),
      icon: <FaRegHeart />,
      activeUrl: false,
    },
    {
      url: "/account/shoppingCart",
      name: t("header.basket"),
      icon: <RiShoppingBagLine />,
      activeUrl: false,
    },
    {
      url: "/account/setting",
      name: t("links.Settings"),
      icon: <IoSettingsOutline />,
      activeUrl: false,
    },
  ];
  function logOut() {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <section className="border border-gray-scale-gray-100 rounded-lg self-start">
        <h2 className="text-xl font-medium mx-5 my-6">
          {t("links.Navigation")}
        </h2>
        <nav>
          <ol>
            {" "}
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.url}
                  end
                  className={({ isActive }) =>
                    `${
                      isActive || link.activeUrl
                        ? "bg-green-gray-scale-50 border-l-4 border-branding-success"
                        : "text-gray-scale-gray-200"
                    } flex hover:bg-gray-scale-gray-300 transition-all `
                  }
                >
                  <div className="flex items-center gap-x-2.5 text-base p-4">
                    <span className="text-2xl">{link.icon}</span>
                    <span>{link.name}</span>
                  </div>
                </NavLink>
              </li>
            ))}
            <li className="cursor-pointer text-base p-5 hover:bg-gray-scale-gray-300 transition-all text-gray-scale-gray-600">
              <button
                type="button"
                className="flex items-center gap-x-2.5 w-full h-full"
                onClick={logOut}
              >
                <span className="text-2xl text-gray-scale-gray-200">
                  <TbLogout />
                </span>
                <span> {t("links.LogOut")}</span>
              </button>
            </li>
          </ol>
        </nav>
      </section>
    </>
  );
};
export default AccountNavigation;
