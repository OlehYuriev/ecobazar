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
          <nav className="flex justify-between items-center">
            <ol className="flex gap-x-3">
              {links.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.url}
                    className={({ isActive }) =>
                      isActive
                        ? "text-branding-success hover:opacity-80 transition-all"
                        : "text-white hover:opacity-80 transition-all"
                    }
                  >
                    <span>{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ol>
            <a
              href="tel:2195550114"
              className="text-white flex items-center hover:opacity-80 transition-all"
            >
              <FiPhoneCall />
              <span className="pl-2">(219) 555-0114</span>
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default HeaderNavigation;
