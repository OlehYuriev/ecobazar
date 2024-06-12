import { FC } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

interface IProps {
  name: string;
  classes?: string;
}

const LinkComponent: FC<IProps> = ({ name, classes }) => {
  return (
    <>
      <Link
        to="/categories"
        className={`inline-flex items-center text-branding-success text-base hover:text-branding-warning transition-all ${classes}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <span className=" pr-3">{name}</span> <FaArrowRightLong />
      </Link>
    </>
  );
};

export default LinkComponent;
