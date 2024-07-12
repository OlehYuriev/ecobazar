import styles from "./Loader.module.scss";

const LoaderComponent = () => {
  return (
    <div className="flex justify-center items-center h-full mt-4">
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoaderComponent;
