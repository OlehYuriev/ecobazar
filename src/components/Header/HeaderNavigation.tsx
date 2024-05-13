import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";

const HeaderNavigation: FC = () => {
  const links = [
    { url: "/", name: "Home" },
    { url: "/categories", name: "Categories" },
  ];

  return (
    <>
      <div className="py-4 bg-gray-scale-gray-800">
        <div className="container">
          <div className="flex justify-between items-center">
            <ol className="flex gap-x-3">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.url}
                  className={({ isActive }) =>
                    isActive
                      ? "text-branding-success hover:opacity-80 transition-all"
                      : "text-white hover:opacity-80 transition-all"
                  }
                >
                  <li>{link.name}</li>
                </NavLink>
              ))}
            </ol>
            <a
              href="tel:2195550114"
              className="text-white flex items-center hover:opacity-80 transition-all"
            >
              <FiPhoneCall />
              <span className="pl-2">(219) 555-0114</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNavigation;
