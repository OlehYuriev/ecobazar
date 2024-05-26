import { User } from "firebase/auth";
import { FC, useState } from "react";

interface IProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploading: boolean;
  progress: number;
  authUser: User | null;
}
const PhotoSetting: FC<IProps> = ({
  setFile,
  uploading,
  progress,
  authUser,
}) => {
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // Создаем временный URL для выбранного файла и сохраняем его в состоянии
      const imageURL = URL.createObjectURL(selectedFile);
      setPreviewURL(imageURL);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-14">
        <div>
          {previewURL ? ( // Отображаем выбранное изображение из состояния, если оно есть
            <img
              src={previewURL}
              alt="Preview"
              className="rounded-full w-56 h-56 object-cover"
            />
          ) : authUser && authUser.photoURL ? ( // Если нет выбранного изображения, показываем изображение пользователя, если оно есть
            <img
              src={authUser.photoURL}
              alt="Profile"
              className="rounded-full w-56 h-56 object-cover"
            />
          ) : (
            <picture>
              <source srcSet="../img/foto.avif" type="image/avif" />
              <source srcSet="../img/foto.webp" type="image/webp" />
              <img
                src="../img/foto.jpg"
                alt="Profile"
                className="rounded-full w-56 h-56 object-cover"
              />
            </picture>
          )}
        </div>
        <div className="flex flex-col  items-center">
          <input
            type="file"
            id="file-upload"
            accept="image/jpeg, image/png, image/svg+xml, image/avif, image/webp"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="file-upload">
            <div
              className="border-2 border-branding-success text-branding-success 
						  font-semibold rounded-56 py-3.5 px-8 hover:text-black
						   hover:bg-green-gray-scale-50 transition-all cursor-pointer mt-8"
            >
              Chose Image
            </div>
          </label>
          {uploading && (
            <p className="text-branding-success">
              Progress: {progress.toFixed(2)}%
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PhotoSetting;
