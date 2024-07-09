import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

const FooterNavigation = () => {
  const authUser = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const [activePath, setActivePath] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/account/order")) {
      setActivePath(true);
    } else {
      setActivePath(false);
    }
  }, [location, activePath]);

  const linksAuth = [
    {
      url: "/account",
      name: t("links.Dashboard"),
      activeUrl: false,
    },
    {
      url: "/account/order",
      name: t("links.OrderHistory"),
      activeUrl: activePath,
    },
    {
      url: "/account/wishlist",
      name: t("Wishlist"),
      activeUrl: false,
    },
    {
      url: "/account/shoppingCart",
      name: t("header.basket"),
      activeUrl: false,
    },
  ];

  const pages = [
    {
      url: "/",
      name: t("header.home"),
    },
    {
      url: "/categories",
      name: t("header.categories"),
    },
  ];
  return (
    <>
      <div className="flex gap-x-32">
        <div>
          {authUser && (
            <>
              <h4 className="text-white text-base font-semibold">
                {t("MyAccount")}
              </h4>
              <ul className="flex flex-col gap-y-3 mt-5">
                {linksAuth.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      onClick={() => window.scrollTo(0, 0)}
                      to={link.url}
                      end
                      className={({ isActive }) =>
                        `${
                          isActive || link.activeUrl ? "text-white" : ""
                        }  hover:text-white transition-all `
                      }
                    >
                      <div className="">
                        <span>{link.name}</span>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div>
          <h4 className="text-white text-base font-semibold">{t("Pages")}</h4>
          <ul className="flex flex-col gap-y-3 mt-5">
            {pages.map((link) => (
              <li key={link.name}>
                <NavLink
                  onClick={() => window.scrollTo(0, 0)}
                  to={link.url}
                  end
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-white" : ""
                    }  hover:text-white transition-all `
                  }
                >
                  <div className="">
                    <span>{link.name}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FooterNavigation;
