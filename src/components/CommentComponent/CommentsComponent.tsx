import IProduct from "@/interface/IProduct";
import { FC, useEffect, useState } from "react";
import { timeAgo } from "@/utils";
import { ref as databaseRef, onValue } from "firebase/database";
import IComment from "@/interface/IComment";
import { database } from "@/firebase";
import styles from "./comments.module.scss";
import { useTranslation } from "react-i18next";

interface IProps {
  product: IProduct;
}

const CommentsComponent: FC<IProps> = ({ product }) => {
  const { t, i18n } = useTranslation();
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleComments, setVisibleComments] = useState(4);
  useEffect(() => {
    const commentsRef = databaseRef(database, "comments/" + product.name);

    const unsubscribe = onValue(
      commentsRef,
      (snapshot) => {
        const data = snapshot.val();
        const commentsList = data
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];
        setComments(commentsList);

        setLoading(false);
      },
      (error) => {
        console.log(error);
        setError("error");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [product.name]);
  const loadMoreComments = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 4);
  };
  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        {t("Errors.Error")}: {error}
      </div>
    );
  return (
    <>
      <div className={styles.comments}>
        {comments.slice(0, visibleComments).map((item) => (
          <div key={item.id} className="pb-5">
            <div className="flex justify-between items-center">
              <div className="flex gap-x-3">
                {item.photoUrl ? (
                  <img
                    src={item.photoUrl}
                    alt={item.username}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                ) : (
                  <picture>
                    <source srcSet="../img/foto.avif" type="image/avif" />
                    <source srcSet="../img/foto.webp" type="image/webp" />
                    <img
                      src="../img/foto.jpg"
                      alt="Profile"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </picture>
                )}

                <span className="font-medium">{item.username}</span>
              </div>
              <small>{timeAgo(item.timestamp, i18n.language)}</small>
            </div>
            <p className="mt-3 text-gray-scale-gray-500">{item.comment}</p>
          </div>
        ))}
        {visibleComments < comments.length && (
          <button
            onClick={loadMoreComments}
            className="text-branding-success bg-branding-success bg-opacity-10
				 py-3.5  rounded-lg max-w-36 font-semibold hover:text-branding-warning transition-all"
          >
            {t("LoadMore")}
          </button>
        )}
      </div>
    </>
  );
};
export default CommentsComponent;
