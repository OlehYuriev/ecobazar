import { storage } from "@/firebase";
import { updateProfile, User } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// Функция для удаления старой фотографии пользователя
export async function deletePhoto(authUser: User): Promise<void> {
  if (authUser.photoURL) {
    const oldImageRef = ref(storage, authUser.photoURL);
    try {
      await deleteObject(oldImageRef);
    } catch (error) {
      console.error("Error deleting old profile picture:", error);
      throw error; // Выбрасываем ошибку, чтобы ее можно было поймать в вызывающей функции
    }
  }
}

export const uploadAndRefreshProfile = async (
  authUser: User,
  file: File,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  setError: React.Dispatch<React.SetStateAction<Error | null>>,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const storageRef = ref(
    storage,
    `profile_pictures/${authUser.uid}/${file.name}`
  );
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<void>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Можно добавить отображение прогресса загрузки
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
      },
      (error) => {
        setError(error);
        setUploading(false);
        reject(error); // Отклоняем обещание в случае ошибки
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            updateProfile(authUser, { photoURL: downloadURL })
              .then(() => {
                setUploading(false);
                // Принудительно обновить состояние пользователя после обновления профиля
                authUser.reload().then(() => {
                  resolve(); // Разрешаем обещание после обновления профиля и перезагрузки пользователя
                });
              })
              .catch((error) => {
                setError(error);
                setUploading(false);
                reject(error); // Отклоняем обещание в случае ошибки при обновлении профиля
              });
          })
          .catch((error) => {
            setError(error);
            setUploading(false);
            reject(error); // Отклоняем обещание в случае ошибки при получении URL-адреса загруженного файла
          });
      }
    );
  });
};
