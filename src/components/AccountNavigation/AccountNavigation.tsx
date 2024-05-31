import { FC } from "react";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { MdDashboard } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
const AccountNavigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const links = [
    { url: "/account", name: "Dashboard", icon: <MdDashboard /> },
    { url: "/account/setting", name: "Settings", icon: <IoSettingsOutline /> },
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
        <h2 className="text-xl font-medium mx-5 my-6">Navigation</h2>
        <nav>
          <ol>
            {" "}
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.url}
                  className={({ isActive }) =>
                    `${
                      isActive && location.pathname === link.url
                        ? "bg-green-gray-scale-50 border-l-4 border-branding-success"
                        : "text-gray-scale-gray-200"
                    } flex hover:bg-gray-scale-gray-300 transition-all`
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
                <span>Log-out</span>
              </button>
            </li>
          </ol>
        </nav>
      </section>
    </>
  );
};
export default AccountNavigation;
