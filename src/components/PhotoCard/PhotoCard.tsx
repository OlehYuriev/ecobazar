import { FC } from "react";
import styles from "./PhotoCard.module.scss";

interface IProps {
  name: string;
  profession: string;
  img: string;
}

const PhotoCard: FC<IProps> = ({ name, profession, img }) => {
  return (
    <>
      <div className={styles.card}>
        <picture>
          <source srcSet={`../img/team/${img}.avif`} type="image/avif" />
          <source srcSet={`../img/team/${img}.webp`} type="image/webp" />
          <img src={`../img/team/${img}.jpg`} alt="name" className="w-full" />
        </picture>
        <div className="px-5 pb-5 pt-4">
          <h4 className=" font-semibold text-lg ">{name}</h4>
          <p className="text-gray-scale-gray-500 mt-1">{profession}</p>
        </div>
      </div>
    </>
  );
};

export default PhotoCard;
